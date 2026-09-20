/*
 * @Author: czy0729
 * @Date: 2026-09-20 04:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-20 08:15:51
 *
 * 自研 CSS 选择器子集 (自研 cheerio 替换引擎的查询层)
 * 覆盖生产在用的选择器全集 (engine-battery.test.ts 收集):
 *   tag / .class / #id / 后代 (空格) / 子组合器 (> + ~) / 属性 [name] [name=value]
 *   及 i/s 标志 / :not() / 逗号组; 结果按文档序去重
 * - CSS 合法但未支持的写法 (其他伪类、转义类名): DEV 下 warn 后抛错,
 *   由上层 cFind/cList 的 catch 兜底, 与「真正的语法错误」区分开
 */
import { DEV } from '@src/config'
import { logger } from '../../../../dev'

import type { SelfNode } from './dom'

interface Compound {
  tag: string // '' 表示 *
  id?: string
  classes: string[]
  attrs: { name: string; op: string; value: string; flag?: string }[]
  not: Compound[]
}

const TAG = '@utils/thirdParty/html/engines/self/selector'

/**
 * 引号感知地定位属性选择器的闭合 ]:
 * 值内允许出现 ] 与嵌套 [ (如 select[name="privacy_set[1]]"]), 只有未引用的 ] 才结束;
 * 返回 ] 的下标, 未找到返回 -1
 */
function findAttrEnd(input: string, start: number): number {
  let quote = ''
  for (let i = start; i < input.length; i++) {
    const char = input[i]
    if (quote) {
      if (char === quote) quote = ''
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (char === ']') return i
  }
  return -1
}

/** 选择器解析缓存 (生产选择器为静态有限集合; 上限防动态串无限增长) */
const SELECTOR_CACHE = new Map<string, ComplexPart[][]>()
const SELECTOR_CACHE_MAX = 1000

/** 已 warn 过的选择器, 避免 DEV 下重复刷屏 */
export const warnedSelectors = new Set<string>()

function warnUnsupported(selector: string, reason: string) {
  if (!DEV || warnedSelectors.has(selector)) return
  warnedSelectors.add(selector)
  logger.warn(TAG, 'selector', reason, selector)
}

type Combinator = '>' | '+' | '~' | ' '

interface ComplexPart {
  combinator: Combinator
  compound: Compound
}

/** 解析单个复合选择器, 如 `a.icon[onclick]` */
function parseCompound(input: string): Compound | null {
  // CSS 转义 (如 a.x\:y) 未支持: DEV warn 后抛错, 不与语法错误混淆
  if (input.includes('\\')) {
    warnUnsupported(input, '未支持的选择器转义 (将抛错并由 cFind/cList 兜底)')
    return null
  }
  const compound: Compound = { tag: '', classes: [], attrs: [], not: [] }
  let i = 0
  while (i < input.length) {
    const char = input[i]
    if (char === '*') {
      i++
      continue
    }
    if (char === '.') {
      const end = input.slice(i + 1).search(/[.#\[:]/)
      const name = end === -1 ? input.slice(i + 1) : input.slice(i + 1, i + 1 + end)
      if (!name) return null
      compound.classes.push(name)
      i += 1 + name.length
      continue
    }
    if (char === '#') {
      const end = input.slice(i + 1).search(/[.#\[:]/)
      const name = end === -1 ? input.slice(i + 1) : input.slice(i + 1, i + 1 + end)
      if (!name) return null
      compound.id = name
      i += 1 + name.length
      continue
    }
    if (char === ':') {
      // 目前仅 :not( <compound> ) (生产在用的唯一伪类);
      // 其余伪类属 CSS 合法但未支持: DEV warn 后抛错, 不与语法错误混淆
      if (!input.startsWith(':not(', i)) {
        const pseudo = input.slice(i).match(/^:[a-zA-Z-]+/)?.[0] || input.slice(i)
        warnUnsupported(input, `未支持的伪类 ${pseudo} (将抛错并由 cFind/cList 兜底)`)
        return null
      }
      const end = input.indexOf(')', i)
      if (end === -1) return null
      const inner = input.slice(i + 5, end)
      const negated = inner
        .split(',')
        .map(part => parseCompound(part.trim()))
        .filter((c): c is Compound => !!c)
      compound.not.push(...negated)
      i = end + 1
      continue
    }
    if (char === '[') {
      const end = findAttrEnd(input, i + 1)
      if (end === -1) return null
      let body = input.slice(i + 1, end).trim()
      // [attr=value i] / [attr=value s] 大小写标志 (CSS 4)
      let flag = ''
      const flagMatch = body.match(/\s+([iIsS])$/)
      if (flagMatch) {
        flag = flagMatch[1].toLowerCase()
        body = body.slice(0, flagMatch.index).trim()
      }
      const eq = body.indexOf('=')
      const pushAttr = (name: string, op: string, value: string) => {
        compound.attrs.push({ name: name.toLowerCase(), op, value, flag: flag || undefined })
      }
      if (eq === -1) {
        pushAttr(body, '', '')
      } else {
        // 支持 = / ^= / $= / *= / ~= / |= ; 前缀字符紧跟在 =
        const value = body.slice(eq + 1).replace(/^(["'])(.*)\1$/, '$2')
        if (eq > 0 && /^[\^$*~|]$/.test(body[eq - 1])) {
          pushAttr(body.slice(0, eq - 1).trim(), body[eq - 1] + '=', value)
        } else {
          pushAttr(body.slice(0, eq).trim(), '=', value)
        }
      }
      i = end + 1
      continue
    }
    // 标签名
    if (!compound.tag && /[a-zA-Z]/.test(char)) {
      const end = input.slice(i).search(/[.#\[:]/)
      compound.tag = (end === -1 ? input.slice(i) : input.slice(i, i + end)).toLowerCase()
      i += compound.tag.length
      continue
    }
    // 未知字符容错: 跳过
    i++
  }
  return compound
}

/** 解析复杂选择器 (无逗号), 返回从左到右的组合器链 */
function parseComplex(input: string): ComplexPart[] | null {
  const parts: ComplexPart[] = []
  let compoundStart = -1
  let combinator: Combinator = ' '

  const flush = (end: number) => {
    if (compoundStart === -1) return
    const compound = parseCompound(input.slice(compoundStart, end))
    if (!compound) {
      throw new Error(`bad compound: ${input.slice(compoundStart, end)}`)
    }
    parts.push({ combinator, compound })
    compoundStart = -1
  }

  let i = 0
  while (i < input.length) {
    const char = input[i]
    if (char === '[') {
      const end = findAttrEnd(input, i + 1)
      if (end === -1) return null
      i = end + 1
      continue
    }
    if (char === '>' || char === '+' || char === '~') {
      flush(i)
      combinator = char as Combinator
      i++
      while (/\s/.test(input[i])) i++
      compoundStart = i
      continue
    }
    if (/\s/.test(char)) {
      flush(i)
      i++
      while (/\s/.test(input[i])) i++
      if (i < input.length && !/[>+~]/.test(input[i]) && compoundStart === -1) {
        combinator = ' '
        compoundStart = i
      }
      continue
    }
    if (compoundStart === -1) compoundStart = i
    i++
  }
  flush(input.length)
  return parts.length ? parts : null
}

/** 解析完整选择器为逗号分隔的复杂选择器列表; 无法解析的部分直接抛错 (与 cheerio 一致) */
function parseSelector(selector: string): ComplexPart[][] {
  const cached = SELECTOR_CACHE.get(selector)
  if (cached) return cached

  const parsed = selector
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const parts = parseComplex(part)
      if (!parts) throw new Error(`Unknown selector: ${part}`)
      return parts
    })

  if (SELECTOR_CACHE.size >= SELECTOR_CACHE_MAX) SELECTOR_CACHE.clear()
  SELECTOR_CACHE.set(selector, parsed)
  return parsed
}

function matchAttr(
  node: SelfNode,
  attr: { name: string; op: string; value: string; flag?: string }
): boolean {
  const actual = node.attribs[attr.name]
  if (attr.op === '') return actual !== undefined
  if (actual === undefined) return false

  // CSS 4 大小写标志: i → 双方小写后比较; s → 默认行为
  const value = attr.flag === 'i' ? attr.value.toLowerCase() : attr.value
  const target = attr.flag === 'i' ? actual.toLowerCase() : actual
  switch (attr.op) {
    case '=':
      return target === value
    case '~=':
      return target.split(/\s+/).includes(value)
    case '^=':
      return value !== '' && target.startsWith(value)
    case '$=':
      return value !== '' && target.endsWith(value)
    case '*=':
      return value !== '' && target.includes(value)
    case '|=':
      return target === value || target.startsWith(`${value}-`)
    default:
      return false
  }
}

/** 单个复合选择器是否命中节点 */
function matchCompound(node: SelfNode, compound: Compound): boolean {
  if (node.nodeType !== 1) return false
  if (compound.tag && node.name !== compound.tag) return false
  if (compound.id && node.attribs.id !== compound.id) return false
  for (const cls of compound.classes) {
    const classAttr = node.attribs.class
    if (!classAttr || !classAttr.split(/\s+/).includes(cls)) return false
  }
  for (const attr of compound.attrs) {
    if (!matchAttr(node, attr)) return false
  }
  for (const negated of compound.not) {
    if (matchCompound(node, negated)) return false
  }
  return true
}

/** 复杂选择器是否命中节点 (从最右复合项向左回溯)
 * - parts[i].combinator 表示 parts[i-1] 与 parts[i] 之间的连接关系,
 *   回溯到 index 时应使用 parts[index + 1].combinator 判断连接方式
 * - isScope: 元素级查询 (.find) 的 scope 元素集合; 相对选择器首组合器为 ">"
 *   时, 最左复合项的父元素必须是 scope (css-select 的 :scope 语义)
 */
function matchComplex(
  node: SelfNode,
  parts: ComplexPart[],
  isScope: (n: SelfNode | null) => boolean
): boolean {
  const last = parts[parts.length - 1]
  if (!last || !matchCompound(node, last.compound)) return false

  const matchRest = (current: SelfNode | null, index: number): boolean => {
    if (index < 0) {
      // 消费完所有复合项: 相对选择器 "> a" 要求最左复合项的父元素就是 scope
      if (parts[0].combinator === '>') return isScope(current?.parent || null)
      return true
    }
    // parts[index] 与 parts[index + 1] 之间的连接方式
    const link = parts[index + 1].combinator
    const { compound } = parts[index]

    if (link === '>') {
      const parent = current?.parent
      return (
        !!parent &&
        parent.nodeType === 1 &&
        matchCompound(parent, compound) &&
        matchRest(parent, index - 1)
      )
    }

    if (link === '+' || link === '~') {
      const siblings = current?.parent?.children || []
      const selfIdx = siblings.indexOf(current as SelfNode)
      if (selfIdx === -1) return false
      const walkSibling = (idx: number): boolean => {
        if (idx < 0) return false
        const sibling = siblings[idx]
        if (sibling.nodeType !== 1) return walkSibling(idx - 1)
        if (!matchCompound(sibling, compound)) {
          return link === '+' ? false : walkSibling(idx - 1)
        }
        if (matchRest(sibling, index - 1)) return true
        // '~' 继续向前找更早的兄弟; '+' 只看紧邻一个
        return link === '~' ? walkSibling(idx - 1) : false
      }
      return walkSibling(selfIdx - 1)
    }

    // 后代组合器: 任一祖先命中即算
    let parent = current?.parent
    while (parent && parent.nodeType === 1) {
      if (matchCompound(parent, compound) && matchRest(parent, index - 1)) return true
      parent = parent.parent
    }
    return false
  }

  return matchRest(node, parts.length - 2)
}

/** 预序 DFS 收集子孙 (含自身), 保证文档序 */
function collectDescendants(roots: SelfNode[], includeSelf: boolean): SelfNode[] {
  const out: SelfNode[] = []
  const walk = (node: SelfNode, withSelf: boolean) => {
    if (withSelf) out.push(node)
    node.children.forEach(child => {
      walk(child, true)
    })
  }
  roots.forEach(root => {
    walk(root, includeSelf)
  })
  return out
}

/** 单节点是否命中选择器 (closest / prev / children 过滤的底层); 解析失败抛错 */
export function matches(node: SelfNode, selector: string): boolean {
  const parsed = parseSelector(selector)
  if (!parsed.length) return false
  for (const parts of parsed) {
    if (matchComplex(node, parts, () => true)) return true
  }
  return false
}

/**
 * 在节点集合范围内执行选择器查询 (cheerio .find / 文档级 $(sel) 的底层)
 * - scope 语义: 相对选择器 (> a) 以 scope 中每个元素为参照
 */
export function select(scope: SelfNode[], selector: string): SelfNode[] {
  // 解析失败直接抛错 (与 cheerio Unknown pseudo-class 行为一致),
  // 由上层 cFind/cList 的 catch 兜底
  const parsed = parseSelector(selector)
  if (!parsed.length) return []

  const seen = new Set<SelfNode>()
  const out: SelfNode[] = []
  const scopeSet = new Set(scope)
  const isScope = (n: SelfNode | null) => !!n && scopeSet.has(n)
  const candidates = collectDescendants(scope, false)

  candidates.forEach(node => {
    if (seen.has(node)) return
    for (const parts of parsed) {
      if (matchComplex(node, parts, isScope)) {
        seen.add(node)
        out.push(node)
        return
      }
    }
  })

  return out
}
