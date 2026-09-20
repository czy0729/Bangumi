/*
 * @Author: czy0729
 * @Date: 2026-09-20 04:13:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-20 04:51:01
 *
 * 自研 DOM 最小节点模型 (自研 cheerio 替换引擎的数据层)
 * - nodeType 对齐 domhandler: 1 element / 3 text / 8 comment / 9 document
 *   (cText 的 matchRawTextNode 依赖 nodeType === 3 过滤文本节点)
 * - attribs 用普通对象承载: 属性按出现顺序插入, JS 对象键序即插入序,
 *   序列化时天然与源文档一致
 * - type 额外区分 directive (<!DOCTYPE ...> 等), 序列化时还原为 <data>
 */
export const NODE_TYPE = {
  element: 1,
  text: 3,
  comment: 8,
  document: 9,
  directive: 10
} as const

export interface SelfNode {
  nodeType: number
  type: 'root' | 'tag' | 'text' | 'comment' | 'directive'
  /** 标签名 (小写) 或空串 */
  name: string
  attribs: Record<string, string>
  children: SelfNode[]
  parent: SelfNode | null
  prev: SelfNode | null
  next: SelfNode | null
  /** text / comment / directive 的内容 */
  data: string
  /** 仅文档根使用: 解析时是否解码了实体 (决定序列化时是否重新编码) */
  decodeEntities?: boolean
}

/**
 * dom-serializer 在解码模式 (encodeEntities 未关) 下的转义:
 * entities.encodeXML —— 命名字典 + 其余非 ASCII 转小写十六进制,
 * 这里直接输出大写 (与 slim 引擎的 normalizeEntityCase 归一结果一致)
 */
const XML_MAP: Record<string, string> = {
  '"': '&quot;',
  '&': '&amp;',
  "'": '&apos;',
  '<': '&lt;',
  '>': '&gt;'
}

export function encodeXML(str: string, upperHex: boolean = true): string {
  let out = ''
  let i = 0
  while (i < str.length) {
    const char = str[i]
    const mapped = XML_MAP[char]
    if (mapped) {
      out += mapped
      i++
      continue
    }
    const code = str.codePointAt(i)
    // 与 entities encodeXML 一致: 补充平面字符 (代理项对) 输出单个码点实体
    if (code !== undefined && (char === '$' || code >= 0x80)) {
      const hex = code.toString(16)
      out += `&#x${upperHex ? hex.toUpperCase() : hex};`
      i += code > 0xffff ? 2 : 1
      continue
    }
    out += char
    i++
  }
  return out
}

export function createNode(partial: Partial<SelfNode>): SelfNode {
  return {
    nodeType: NODE_TYPE.element,
    type: 'tag',
    name: '',
    attribs: {},
    children: [],
    parent: null,
    prev: null,
    next: null,
    data: '',
    ...partial
  }
}

export function createDocument(): SelfNode {
  return createNode({ nodeType: NODE_TYPE.document, type: 'root' })
}

/** 把节点挂到 parent 的 children 尾部, 同时维护 prev/next 兄弟链 */
export function appendChild(parent: SelfNode, node: SelfNode) {
  const last = parent.children[parent.children.length - 1] || null
  node.parent = parent
  node.prev = last
  node.next = null
  if (last) last.next = node
  parent.children.push(node)
}

/**
 * void / single 元素 (htmlparser2 voidElements = dom-serializer singleTag):
 * 解析时不入栈, 序列化时不输出闭合标签
 */
const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'basefont',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
])

export function isVoidElement(name: string): boolean {
  return VOID_ELEMENTS.has(name)
}

/**
 * htmlparser2 openImpliesClose: 打开 T 时应隐式闭合的栈顶元素集合
 * (htmlMode; 与 htmlparser2 v9 Parser.js 逐条一致)
 */
const FORM_TAGS = new Set([
  'input',
  'option',
  'optgroup',
  'select',
  'button',
  'datalist',
  'textarea'
])
const P_TAG = new Set(['p'])
const TABLE_SECTION_TAGS = new Set(['thead', 'tbody'])
const DDT_TAGS = new Set(['dd', 'dt'])
const RTP_TAGS = new Set(['rt', 'rp'])

export const OPEN_IMPLIES_CLOSE = new Map<string, Set<string>>([
  ['tr', new Set(['tr', 'th', 'td'])],
  ['th', new Set(['th'])],
  ['td', new Set(['thead', 'th', 'td'])],
  ['body', new Set(['head', 'link', 'script'])],
  ['li', new Set(['li'])],
  ['p', P_TAG],
  ['h1', P_TAG],
  ['h2', P_TAG],
  ['h3', P_TAG],
  ['h4', P_TAG],
  ['h5', P_TAG],
  ['h6', P_TAG],
  ['select', FORM_TAGS],
  ['input', FORM_TAGS],
  ['output', FORM_TAGS],
  ['button', FORM_TAGS],
  ['datalist', FORM_TAGS],
  ['textarea', FORM_TAGS],
  ['option', new Set(['option'])],
  ['optgroup', new Set(['optgroup', 'option'])],
  ['dd', DDT_TAGS],
  ['dt', DDT_TAGS],
  ['address', P_TAG],
  ['article', P_TAG],
  ['aside', P_TAG],
  ['blockquote', P_TAG],
  ['details', P_TAG],
  ['div', P_TAG],
  ['dl', P_TAG],
  ['fieldset', P_TAG],
  ['figcaption', P_TAG],
  ['figure', P_TAG],
  ['footer', P_TAG],
  ['form', P_TAG],
  ['header', P_TAG],
  ['hr', P_TAG],
  ['main', P_TAG],
  ['nav', P_TAG],
  ['ol', P_TAG],
  ['pre', P_TAG],
  ['section', P_TAG],
  ['table', P_TAG],
  ['ul', P_TAG],
  ['rt', RTP_TAGS],
  ['rp', RTP_TAGS],
  ['tbody', TABLE_SECTION_TAGS],
  ['tfoot', TABLE_SECTION_TAGS]
])

/** dom-serializer unencodedElements: 直接子文本不重新编码的元素 */
const UNENCODED_ELEMENTS = new Set([
  'style',
  'script',
  'xmp',
  'iframe',
  'noembed',
  'noframes',
  'plaintext',
  'noscript'
])

/**
 * 序列化 (dom-serializer, HTML 模式):
 * - encode=false (decodeEntities:false, 门面显式传入): 文本原样输出
 *   ("entities weren't decoded, no need to encode them back"), 属性只转义双引号
 * - encode=true (htmlparser2 默认解码): 文本/属性用 encodeXML 重新编码
 * - 属性空值输出裸属性名 (disabled="" → disabled)
 * - void 元素无闭合标签, 即使意外带子节点
 */
function serializeInner(node: SelfNode, encode: boolean, upperHex: boolean): string {
  if (node.nodeType === NODE_TYPE.text) {
    if (!encode) return node.data
    // unencodedElements 的直接子文本不编码
    const parentName = node.parent?.name || ''
    if (UNENCODED_ELEMENTS.has(parentName)) return node.data
    return encodeXML(node.data, upperHex)
  }
  if (node.nodeType === NODE_TYPE.comment) return `<!--${node.data}-->`
  if (node.nodeType === NODE_TYPE.directive) return `<${node.data}>`

  let out = ''
  node.children.forEach(child => {
    out += serializeNode(child, encode, upperHex)
  })
  return out
}

/** 序列化单个节点 (含外层标签) */
export function serializeNode(node: SelfNode, encode: boolean, upperHex: boolean): string {
  if (node.nodeType !== NODE_TYPE.element) return serializeInner(node, encode, upperHex)

  let out = `<${node.name}`
  Object.keys(node.attribs).forEach(name => {
    const value = node.attribs[name] ?? ''
    if (value === '') {
      out += ` ${name}`
    } else {
      const encoded = encode ? encodeXML(value, upperHex) : value.replace(/"/g, '&quot;')
      out += ` ${name}="${encoded}"`
    }
  })

  if (isVoidElement(node.name)) return `${out}>`

  out += '>'
  out += serializeInner(node, encode, upperHex)
  return `${out}</${node.name}>`
}

/**
 * 序列化节点列表 (cheerio .html() / $.html() 的底层)
 * - upperHex: 数字实体大小写。cheerio slim 只对元素级 .html() 做归一 (大写),
 *   文档级 $.html() 走 render 原样输出 (小写), 两处需分别对齐
 */
export function serializeNodes(
  nodes: SelfNode[],
  encode: boolean,
  upperHex: boolean = true
): string {
  let out = ''
  nodes.forEach(node => {
    out += serializeNode(node, encode, upperHex)
  })
  return out
}

/** 从任意节点向上找文档根 */
export function findRoot(node: SelfNode): SelfNode {
  let cur = node
  while (cur.parent) cur = cur.parent
  return cur
}
