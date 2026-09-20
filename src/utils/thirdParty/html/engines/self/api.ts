/*
 * @Author: czy0729
 * @Date: 2026-09-20 04:12:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-20 08:25:53
 *
 * 自研 cheerio 兼容引擎的查询 API 层 (duck-type CheerioAPI)
 * - 文档级 $: 可调用 (选择器 → 集合; 节点 → 包装), 带 .load
 * - 元素级集合: find/eq/last/each/map/filter/contents/children/parent/prev/
 *   next/closest/hasClass/attr/data/text/html/length
 * - 语义以 cheerio 1.0 为准, 与 battery 基线逐字节对拍锁定
 */
import { appendChild, createDocument, createNode, findRoot, NODE_TYPE, serializeNodes } from './dom'
import { matches, select } from './selector'
import { parse } from './tokenizer'

import type { SelfNode } from './dom'
export type { SelfNode } from './dom'

const R_BRACE = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/

/** cheerio parseDataValue 同款转换: data-* 字符串值 → JS 原始值 */
function parseDataValue(value: string): unknown {
  if (value === 'null') return null
  if (value === 'true') return true
  if (value === 'false') return false
  const num = Number(value)
  if (value === String(num)) return num
  if (R_BRACE.test(value)) {
    try {
      return JSON.parse(value)
    } catch {
      /* ignore */
    }
  }
  return value
}

type EachFn = (index: number, element: SelfNode) => boolean | void
type MapFn = (index: number, element: SelfNode) => unknown
type FilterFn = (index: number, element: SelfNode) => unknown

/** 连接单个节点的全部后代文本 (cheerio textContent 语义: 忽略注释等非文本节点) */
function textOf(node: SelfNode): string {
  if (node.nodeType === NODE_TYPE.text) return node.data
  if (node.nodeType !== NODE_TYPE.element && node.nodeType !== NODE_TYPE.document) return ''
  return node.children.map(textOf).join('')
}

/** option 的值: value 属性优先, 缺失时回退到 option 文本 (HTML spec / cheerio 实测) */
function optionValue(option: SelfNode): string {
  return option.attribs.value ?? textOf(option)
}

/** 元素级集合 (array-like) */
export class SelfSelection {
  nodes: SelfNode[]

  constructor(nodes: SelfNode[]) {
    this.nodes = nodes
    // array-like: $sel[0] / $sel.length 直接可用
    nodes.forEach((node, index) => {
      ;(this as any)[index] = node
    })
  }

  get length(): number {
    return this.nodes.length
  }

  eq(index: number): SelfSelection {
    const len = this.nodes.length
    const real = index < 0 ? len + index : index
    return new SelfSelection(real >= 0 && real < len ? [this.nodes[real]] : [])
  }

  last(): SelfSelection {
    return this.eq(-1)
  }

  first(): SelfSelection {
    return this.eq(0)
  }

  each(fn: EachFn): SelfSelection {
    for (let i = 0; i < this.nodes.length; i++) {
      if (fn.call(this.nodes[i], i, this.nodes[i]) === false) break
    }
    return this
  }

  /** cheerio .map: 返回带 .get() 的对象 */
  map(fn: MapFn): { get: () => unknown[] } {
    const out: unknown[] = []
    for (let i = 0; i < this.nodes.length; i++) {
      out.push(fn.call(this.nodes[i], i, this.nodes[i]))
    }
    return { get: () => out }
  }

  /**
   * cheerio .val() 语义 (attributes.js 实测):
   * - select: option[selected] 的 value; 非 multiple 且无 [selected] 时回退首个
   *   option (css-select :selected 别名, HTML spec selectedness); multiple 返回
   *   选中 option 的文本数组
   * - input / option: attr('value')
   * - textarea: text()
   * setter: input/option/textarea → attr('value', v); select 按值匹配 option 置 selected
   */
  val(): string | string[] | undefined
  val(value: string | string[]): SelfSelection
  val(value?: string | string[]): string | string[] | undefined | SelfSelection {
    const element = this.nodes[0]
    if (!element || element.nodeType !== 1) return value === undefined ? undefined : this

    if (value === undefined) {
      if (element.name === 'textarea') return this.text()
      if (element.name === 'select') {
        const options = element.children.filter(child => child.name === 'option')
        let selected = options.filter(option => option.attribs.selected !== undefined)
        // css-select :selected 别名: 非 multiple 且无 [selected] 时回退首个 option
        // (HTML spec selectedness 规则)
        if (!selected.length && element.attribs.multiple === undefined && options.length) {
          selected = [options[0]]
        }
        if (element.attribs.multiple !== undefined) {
          return selected.map(option =>
            option.children
              .filter(c => c.nodeType === 3)
              .map(c => c.data)
              .join('')
          )
        }
        return selected[0] ? optionValue(selected[0]) : undefined
      }
      if (element.name === 'input') return element.attribs.value
      if (element.name === 'option') return optionValue(element)
      return undefined
    }

    if (element.name === 'select') {
      const values = Array.isArray(value) ? value : [value]
      this.nodes.forEach(node => {
        if (node.nodeType !== 1) return
        node.children.forEach(child => {
          if (child.name !== 'option') return
          delete child.attribs.selected
        })
        node.children.forEach(child => {
          if (child.name !== 'option') return
          if (values.includes(child.attribs.value)) child.attribs.selected = ''
        })
      })
      return this
    }
    return this.attr('value', Array.isArray(value) ? value[0] : value)
  }

  /** cheerio .filter 双形态: 函数 (this 绑定元素) 或选择器字符串 */
  filter(fnOrSelector: FilterFn | string): SelfSelection {
    if (typeof fnOrSelector === 'string') {
      return new SelfSelection(this.nodes.filter(node => matches(node, fnOrSelector)))
    }
    return new SelfSelection(
      this.nodes.filter((node, index) => !!fnOrSelector.call(node, index, node))
    )
  }

  /** 后代查询 (跨 scope 按文档序去重) */
  find(selector: string): SelfSelection {
    return new SelfSelection(select(this.nodes, selector))
  }

  /** 全部子节点 (含文本 / 注释) */
  contents(): SelfSelection {
    return new SelfSelection(this.nodes.flatMap(node => node.children))
  }

  /** 子元素 (不含文本 / 注释), 可选选择器过滤 (作用于子元素自身) */
  children(selector?: string): SelfSelection {
    const elements = this.nodes.flatMap(node => node.children.filter(child => child.nodeType === 1))
    return selector
      ? new SelfSelection(elements.filter(element => matches(element, selector)))
      : new SelfSelection(elements)
  }

  /** 各节点的父元素去重, 可选选择器过滤 (cheerio .parent(selector) 语义) */
  parent(selector?: string): SelfSelection {
    const seen = new Set<SelfNode>()
    const out: SelfNode[] = []
    this.nodes.forEach(node => {
      const parent = node.parent
      if (parent && parent.nodeType === 1 && !seen.has(parent)) {
        seen.add(parent)
        out.push(parent)
      }
    })
    return selector
      ? new SelfSelection(out.filter(node => matches(node, selector)))
      : new SelfSelection(out)
  }

  /** 最近的元素级兄弟, 可选选择器过滤 (cheerio .prev/.next 语义) */
  next(selector?: string): SelfSelection {
    const found = this.nodes
      .map(node => {
        let cur = node.next
        while (cur && cur.nodeType !== 1) cur = cur.next
        return cur
      })
      .filter((node): node is SelfNode => !!node)
    if (!selector) return new SelfSelection(found)
    return new SelfSelection(found.filter(node => matches(node, selector)))
  }

  prev(selector?: string): SelfSelection {
    const found = this.nodes
      .map(node => {
        let cur = node.prev
        while (cur && cur.nodeType !== 1) cur = cur.prev
        return cur
      })
      .filter((node): node is SelfNode => !!node)
    if (!selector) return new SelfSelection(found)
    return new SelfSelection(found.filter(node => matches(node, selector)))
  }

  /** 含自身的最近祖先匹配; 无参返回空集 (cheerio traversing.js 实测语义) */
  closest(selector?: string): SelfSelection {
    if (!selector) return new SelfSelection([])
    const seen = new Set<SelfNode>()
    const out: SelfNode[] = []
    this.nodes.forEach(node => {
      let cur: SelfNode | null = node
      while (cur) {
        if (matches(cur, selector) && !seen.has(cur)) {
          seen.add(cur)
          out.push(cur)
          return
        }
        cur = cur.parent
      }
    })
    return new SelfSelection(out)
  }

  hasClass(className: string): boolean {
    return this.nodes.some(node => {
      const classAttr = node.attribs.class
      return !!classAttr && classAttr.split(/\s+/).includes(className)
    })
  }

  attr(name: string): string | undefined
  attr(name: string, value: string | null): SelfSelection
  attr(name: string, value?: string | null): string | undefined | SelfSelection {
    if (value === undefined) {
      const node = this.nodes[0]
      return node ? node.attribs[name] : undefined
    }
    this.nodes.forEach(node => {
      if (node.nodeType !== 1) return
      // cheerio 语义: attr(name, null) 删除属性
      if (value === null) delete node.attribs[name]
      else node.attribs[name] = value
    })
    return this
  }

  /**
   * data-* 读取, camelCase 键 → data-user-id 形式属性
   * 值转换与 cheerio parseDataValue 一致: null/true/false/数字/JSON
   */
  data(key: string): unknown {
    const kebab = key.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`)
    const node = this.nodes[0]
    if (!node) return undefined
    const value = node.attribs[`data-${kebab}`]
    if (value === undefined) return undefined
    return parseDataValue(value)
  }

  /** 连接全部后代文本节点 */
  text(): string {
    return this.nodes.map(textOf).join('')
  }

  /** 首个元素的 inner HTML; 非元素节点 (文本/注释/指令) 返回 null (cheerio isTag 语义) */
  html(): string | null {
    const node = this.nodes[0]
    if (!node || (node.nodeType !== 1 && node.nodeType !== 9)) return null
    // 编码模式跟随所属文档的解析选项; 元素级数字实体大写 (slim normalizeEntityCase)
    const encode = findRoot(node).decodeEntities === true
    return serializeNodes(node.children, encode, true)
  }

  /**
   * 序列化整个选择集 (outer HTML), cheerio .toString() 的底层
   * - cheerio 的 toString 走 render, 不经过 slim 的 normalizeEntityCase 补丁,
   *   数字实体为小写 (与元素级 .html() 的大写不同), 此处按 slim 实测对齐
   */
  toString(): string {
    const encode = this.nodes[0] ? findRoot(this.nodes[0]).decodeEntities === true : true
    return serializeNodes(this.nodes, encode, false)
  }

  /** 无参返回全部 DOM 节点数组, 带参返回下标处节点 (cheerio .get 语义) */
  get(): SelfNode[]
  get(index: number): SelfNode | undefined
  get(index?: number): SelfNode[] | SelfNode | undefined {
    if (index === undefined) return this.nodes.slice()
    const len = this.nodes.length
    const real = index < 0 ? len + index : index
    return real >= 0 && real < len ? this.nodes[real] : undefined
  }

  /** 清空各元素的全部子节点 */
  empty(): SelfSelection {
    this.nodes.forEach(node => {
      if (node.nodeType !== 1 && node.nodeType !== 9) return
      node.children.forEach(child => {
        child.parent = null
        child.prev = null
        child.next = null
      })
      node.children = []
    })
    return this
  }

  /**
   * 在各元素末尾插入内容 (字符串 / 节点 / 选择集)
   * - 同文档节点为移动语义 (先从原父节点摘除), 与 cheerio 一致
   */
  append(content: string | SelfNode | SelfNode[] | SelfSelection): SelfSelection {
    this.nodes.forEach((target, targetIndex) => {
      if (target.nodeType !== 1 && target.nodeType !== 9) return
      normalizeContent(content, target, targetIndex > 0).forEach(node => {
        detach(node)
        appendChild(target, node)
      })
    })
    return this
  }

  /**
   * 用回调 / 内容替换各元素 (cheerio .replaceWith 语义)
   * - 回调返回 HTML 字符串 / 节点 / 选择集, 返回空串则直接移除
   */
  replaceWith(
    content:
      | string
      | SelfNode
      | SelfNode[]
      | SelfSelection
      | ((
          index: number,
          element: SelfNode
        ) => string | SelfNode | SelfNode[] | SelfSelection | null | undefined)
  ): SelfSelection {
    this.nodes.forEach((node, index) => {
      const parent = node.parent
      if (!parent) return
      const resolved = typeof content === 'function' ? content(index, node) : content
      const replacement = resolved instanceof SelfSelection ? resolved.nodes : resolved || []

      const at = parent.children.indexOf(node)
      if (at === -1) return
      parent.children.splice(at, 1)
      if (node.prev) node.prev.next = node.next
      if (node.next) node.next.prev = node.prev

      const inserted = normalizeContent(replacement as any, parent, false)
      parent.children.splice(at, 0, ...inserted)
      linkSiblings(parent.children)
      inserted.forEach(child => {
        child.parent = parent
      })
    })
    return this
  }

  /**
   * 把选择集内各元素移动到各 target 元素之后 (cheerio .insertAfter 语义)
   * - 多 target 时对每个 target 各插一份: 首个 target 插原节点, 其余插克隆
   *   (实测 cheerio: A.insertAfter(C, D) → C,A,D,A)
   */
  insertAfter(target: SelfNode | SelfNode[] | SelfSelection): SelfSelection {
    const targets =
      target instanceof SelfSelection ? target.nodes : Array.isArray(target) ? target : [target]

    // 先整体摘除被移动节点 (会改变各 target 的下标, 因此每个 target 插入前重新定位)
    const moving = this.nodes.map(node => {
      detach(node)
      return node
    })

    targets.forEach((anchor, targetIndex) => {
      const parent = anchor?.parent
      if (!parent) return
      const idx = parent.children.indexOf(anchor)
      if (idx === -1) return

      const nodes = targetIndex === 0 ? moving : moving.map(cloneNode)
      parent.children.splice(idx + 1, 0, ...nodes)
      linkSiblings(parent.children)
      nodes.forEach(node => {
        node.parent = parent
      })
    })
    return this
  }
}

/** 节点从父节点的 children 与兄弟链中摘除 */
function detach(node: SelfNode) {
  const parent = node.parent
  if (!parent) return
  const at = parent.children.indexOf(node)
  if (at !== -1) parent.children.splice(at, 1)
  if (node.prev) node.prev.next = node.next
  if (node.next) node.next.prev = node.prev
  node.parent = null
  node.prev = null
  node.next = null
}

/** 重建一层 children 的 prev/next 兄弟链 */
function linkSiblings(children: SelfNode[]) {
  children.forEach((child, index) => {
    child.prev = index > 0 ? children[index - 1] : null
    child.next = index < children.length - 1 ? children[index + 1] : null
  })
}

/**
 * 内容规整: HTML 字符串 → 解析出的节点数组; 节点/数组原样
 * @param decodeTarget 用于判断所属文档编码模式的参照节点
 * @param clone 多目标时克隆节点, 避免同一节点被插入多处
 */
function normalizeContent(
  content: string | SelfNode | SelfNode[] | SelfSelection,
  decodeTarget: SelfNode,
  clone: boolean
): SelfNode[] {
  let nodes: SelfNode[]
  if (typeof content === 'string') {
    const decode = findRoot(decodeTarget).decodeEntities === true
    nodes = parse(content, decode).children
  } else if (content instanceof SelfSelection) {
    nodes = content.nodes
  } else if (Array.isArray(content)) {
    nodes = content
  } else {
    nodes = [content]
  }
  return clone ? nodes.map(cloneNode) : nodes.slice()
}

/** 深拷贝节点 (append/replaceWith 多目标场景) */
function cloneNode(node: SelfNode): SelfNode {
  const copy = createNode({
    nodeType: node.nodeType,
    type: node.type,
    name: node.name,
    data: node.data,
    attribs: { ...node.attribs }
  })
  copy.children = node.children.map(child => {
    const childCopy = cloneNode(child)
    childCopy.parent = copy
    return childCopy
  })
  linkSiblings(copy.children)
  return copy
}

/** 文档级 $: 可调用 + .load */
export interface SelfDocument {
  (selector: string): SelfSelection
  (node: SelfNode): SelfSelection
  load: (html: string, options?: object) => SelfDocument
  root: () => SelfSelection
  html: () => string
}

export function createDocumentEngine(doc: SelfNode = createDocument()): SelfDocument {
  const $document = ((target: string | SelfNode) => {
    if (typeof target === 'string') {
      // 以文档根为 scope: 顶层元素自身也在候选范围内
      return new SelfSelection(select([doc], target))
    }
    return new SelfSelection([target])
  }) as SelfDocument

  $document.load = (html: string, options?: { decodeEntities?: boolean }) => {
    // htmlparser2 默认解码实体; 门面显式传 false 时保留原文
    const decode = options?.decodeEntities !== false
    const parsed = parse(html || '', decode)
    parsed.decodeEntities = decode
    return createDocumentEngine(parsed)
  }

  $document.root = () => new SelfSelection([doc])

  $document.html = () =>
    // 文档级 $.html(): slim 输出小写十六进制实体, 与元素级 .html() 不同
    serializeNodes(doc.children, doc.decodeEntities === true, false)

  return $document
}
