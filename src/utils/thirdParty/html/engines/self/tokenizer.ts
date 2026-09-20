/*
 * @Author: czy0729
 * @Date: 2026-09-20 04:14:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-20 08:36:33
 *
 * 自研 HTML tokenizer + 栈式建树 (自研 cheerio 替换引擎的解析层)
 * - 对齐 htmlparser2 v9 默认语义 (cheerio 1.0 slim 的底层, htmlMode):
 *   - decodeEntities: false —— 文本与属性值保留原始实体, 不反转义
 *   - 标签名 / 属性名小写化
 *   - void 元素不入栈; openImpliesClose 隐式闭合 (见 dom.ts 规则表)
 *   - 自闭合 "/>" 忽略 (recognizeSelfClosing 默认 false)
 *   - 未闭合标签在遇到对应闭合标签或文档结束时回退闭合;
 *     </p> 无开标签时隐式补一个空 <p>, </br> 隐式补一个 <br>
 */
import { decodeEntities as decodeHTML } from './decode'
import {
  appendChild,
  createDocument,
  createNode,
  isVoidElement,
  NODE_TYPE,
  OPEN_IMPLIES_CLOSE
} from './dom'

import type { SelfNode } from './dom'

const NAME_CHAR = /[^\s/>]/

/**
 * raw text 元素 (htmlparser2 special 序列): 内容不做标签解析
 * - script / style / textarea 的文本不反转义; 序列化时 script/style 不编码 (dom.ts 的
 *   UNENCODED_ELEMENTS), textarea / title 的文本仍会编码
 * - title 是例外: decode=true 时其内容仍会反转义 (htmlparser2 实测)
 */
const SPECIAL_TAGS = new Set(['script', 'style', 'title', 'textarea'])

/** 内容在 decode=true 时需要反转义的 raw text 元素 */
const SPECIAL_TAGS_DECODE = new Set(['title'])

/** 解析一个开始标签, 返回 { name, attrs, 自闭合 }; pos 指向 '<' */
function parseStartTag(html: string, pos: number, decode: boolean) {
  let i = pos + 1
  let name = ''
  while (i < html.length && NAME_CHAR.test(html[i])) {
    name += html[i]
    i++
  }
  name = name.toLowerCase()

  const attribs: Record<string, string> = {}
  let selfClosing = false
  /** 是否消费到了结束的 '>'; EOF 前未见到时整个标签被丢弃 (htmlparser2 行为) */
  let closed = false

  // 跳过空白并逐个收集属性, 直到 '>' 或 '/>'
  while (i < html.length) {
    while (i < html.length && /\s/.test(html[i])) i++
    if (html[i] === undefined) break

    if (html[i] === '>') {
      i++
      closed = true
      break
    }
    if (html[i] === '/') {
      // '/>': 自闭合; htmlparser2 默认 recognizeSelfClosing=false,
      // 只消费字符并标记, 不影响入栈
      if (html[i + 1] === '>') {
        selfClosing = true
        closed = true
        i += 2
        break
      }
      i++
      continue
    }

    // 属性名
    let attrName = ''
    while (i < html.length && /[^\s=/>]/.test(html[i])) {
      attrName += html[i]
      i++
    }
    if (!attrName) {
      // 非法字符容错: 跳过避免死循环
      i++
      continue
    }

    let value = ''
    // 值: = "..." | '...' | 裸值
    while (i < html.length && /\s/.test(html[i])) i++
    if (html[i] === '=') {
      i++
      while (i < html.length && /\s/.test(html[i])) i++
      const quote = html[i]
      if (quote === '"' || quote === "'") {
        i++
        const end = html.indexOf(quote, i)
        // 引号未闭合: htmlparser2 直到文档结束都停在属性值里, 该标签整个被丢弃
        if (end === -1) {
          return { name, attribs, selfClosing, pos: html.length, unterminated: true }
        }
        value = html.substring(i, end)
        i = end + 1
      } else {
        while (i < html.length && /[^\s>]/.test(html[i])) {
          value += html[i]
          i++
        }
      }
    }
    // 重复属性名保留第一个 (HTML 规范, htmlparser2 一致)
    const key = attrName.toLowerCase()
    if (!(key in attribs)) {
      // 布尔属性 (checked / disabled ...) 值为空串, 序列化为裸属性名, 与 cheerio 一致
      attribs[key] = decode ? decodeHTML(value, true) : value
    }
  }

  return { name, attribs, selfClosing, pos: i, unterminated: !closed }
}

/**
 * 解析 HTML 为文档树
 * @param html 源文档 (引擎层已做过 removeCF 等前置清洗)
 * @param decode 是否反转义文本/属性实体; htmlparser2 默认 true,
 *   cheerio 门面会显式传 false (保留原文)
 */
export function parse(html: string, decode: boolean = true): SelfNode {
  const doc = createDocument()
  // 与 htmlparser2 一致: 栈顶为最近打开的元素 (unshift 语义)
  const stack: SelfNode[] = []

  const appendText = (text: string) => {
    // script/style 内容原样透传, 不做实体解码
    const top = stack[stack.length - 1]
    const inSpecial = !!top && SPECIAL_TAGS.has(top.name)
    const decoded = inSpecial || !decode ? text : decodeHTML(text, false)
    appendChild(top || doc, createNode({ nodeType: NODE_TYPE.text, type: 'text', data: decoded }))
  }

  const openElement = (name: string, attribs: Record<string, string>) => {
    // openImpliesClose: 打开 T 前隐式闭合符合条件的栈顶元素 (循环至不满足)
    const impliesClose = OPEN_IMPLIES_CLOSE.get(name)
    if (impliesClose) {
      while (stack.length > 0 && impliesClose.has(stack[stack.length - 1].name)) {
        stack.pop()
      }
    }

    const node = createNode({ name, attribs })
    appendChild(stack[stack.length - 1] || doc, node)

    if (!isVoidElement(name)) {
      stack.push(node)
    }
    return node
  }

  const closeElement = (name: string) => {
    if (isVoidElement(name)) {
      // </br> 隐式补一个 <br>; 其余 void 闭合标签忽略
      if (name === 'br') {
        openElement('br', {})
      }
      return
    }

    // 从栈顶向下找最近的同名开标签, 途中未闭合元素一并回退闭合
    const idx = stack.map(item => item.name).lastIndexOf(name)
    if (idx !== -1) {
      stack.length = idx
    } else if (name === 'p') {
      // </p> 无开标签: 隐式补开再闭合 (空 <p>)
      openElement('p', {})
      stack.pop()
    }
  }

  let i = 0
  const len = html.length

  while (i < len) {
    // raw text 内容透传: 直接找对应闭合标签, 期间一切标签均按原文
    const top = stack[stack.length - 1]
    if (top && SPECIAL_TAGS.has(top.name)) {
      const closeRe = new RegExp(`</${top.name}`, 'i')
      const rest = html.slice(i)
      const m = rest.match(closeRe)
      const contentEnd = m ? i + m.index : len
      if (contentEnd > i) {
        const raw = html.slice(i, contentEnd)
        const data = decode && SPECIAL_TAGS_DECODE.has(top.name) ? decodeHTML(raw, false) : raw
        appendChild(top, createNode({ nodeType: NODE_TYPE.text, type: 'text', data }))
      }
      if (m) {
        stack.pop()
        const gt = html.indexOf('>', i + m.index)
        i = gt === -1 ? len : gt + 1
      } else {
        i = len
      }
      continue
    }

    const lt = html.indexOf('<', i)

    // 文本节点
    if (lt === -1) {
      appendText(html.substring(i))
      break
    }
    if (lt > i) {
      appendText(html.substring(i, lt))
    }
    i = lt

    // 注释 <!-- ... -->
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4)
      const data = end === -1 ? html.substring(i + 4) : html.substring(i + 4, end)
      appendChild(
        stack[stack.length - 1] || doc,
        createNode({ nodeType: NODE_TYPE.comment, type: 'comment', data })
      )
      i = end === -1 ? len : end + 3
      continue
    }

    // CDATA: htmlparser2 html 模式按注释处理, 内容可含 '>', 到 ']]>' 为止
    if (html.startsWith('<![CDATA[', i)) {
      const end = html.indexOf(']]>', i + 9)
      const inner = end === -1 ? html.substring(i + 9) : html.substring(i + 9, end)
      appendChild(
        stack[stack.length - 1] || doc,
        createNode({ nodeType: NODE_TYPE.comment, type: 'comment', data: `[CDATA[${inner}]]` })
      )
      i = end === -1 ? len : end + 3
      continue
    }

    // 处理器指令 <?...?>: 到 '>' 为止, data 含首尾 '?', 序列化 <data> 还原
    if (html[i + 1] === '?') {
      const end = html.indexOf('>', i + 2)
      const data = end === -1 ? html.substring(i + 1) : html.substring(i + 1, end)
      appendChild(
        stack[stack.length - 1] || doc,
        createNode({ nodeType: NODE_TYPE.directive, type: 'directive', data })
      )
      i = end === -1 ? len : end + 1
      continue
    }

    // 指令 <!DOCTYPE ...> 等: 到 '>' 为止; data 含 '!' (序列化 <data> 还原 <!DOCTYPE html>)
    if (html[i + 1] === '!') {
      const end = html.indexOf('>', i + 2)
      const data = end === -1 ? html.substring(i + 1) : html.substring(i + 1, end)
      appendChild(
        stack[stack.length - 1] || doc,
        createNode({ nodeType: NODE_TYPE.directive, type: 'directive', data })
      )
      i = end === -1 ? len : end + 1
      continue
    }

    // 结束标签
    if (html[i + 1] === '/') {
      const end = html.indexOf('>', i + 2)
      if (end === -1) {
        // 无闭合的残缺标签: 当作文本吞掉
        appendText(html.substring(i))
        break
      }
      const name = html
        .substring(i + 2, end)
        .split(/\s/)[0]
        .toLowerCase()
      if (name) closeElement(name)
      i = end + 1
      continue
    }

    // 开始标签 (下一个字符必须是字母, 其余 '<' 按文本处理)
    const nextChar = html[i + 1]
    if (!nextChar || !/[a-zA-Z]/.test(nextChar)) {
      appendText('<')
      i++
      continue
    }

    const { name, attribs, pos, unterminated } = parseStartTag(html, i, decode)
    i = pos
    if (unterminated) break
    openElement(name, attribs)
  }

  return doc
}
