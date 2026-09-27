/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 纯文本处理（中日文优先、回复纯文本提取、视觉长度计算与截断, 拆分自 data-source.ts）
 */
import { HTMLDecode, removeHTMLTag } from '../thirdParty/html'
import { getSetting } from './utils'

/**
 * 适配系统中文优先返回合适字符串
 * - 上游来源类型不一 (接口字段可能为 string / undefined / null), 故按 unknown 接收后统一转字符串
 */
export function cnjp(cn: unknown, jp: unknown): string {
  const { cnFirst } = getSetting()
  return HTMLDecode(String((cnFirst ? cn || jp : jp || cn) || ''))
}

/** 获取符合预期的回复纯文字 */
export function getCommentPlainText(str: string) {
  const pattern = /<img[^>]+alt="\((bgm\d+)\)"[^>]*>/
  return removeHTMLTag(
    str
      .replace(/<div class="quote">(.+?)<\/div>/g, '')
      .replace(/<br>/g, '\n')
      .replace(pattern, '($1)')
  )
}

/**
 * 计算字符串的“视觉长度”
 *  - 中文算 1
 *  - 数字 / 英文 / 常见半角符号算 0.5
 */
export function getVisualLength(str: string = '') {
  let len = 0

  for (let i = 0; i < str.length; ) {
    // 按码点遍历, 代理对作为整体处理
    const code = str.codePointAt(i) as number
    i += code > 0xffff ? 2 : 1

    // 控制字符不计宽度
    if (code < 32) continue

    // ASCII 字符宽度 0.5, 其余宽度 1
    len += code < 0x80 ? 0.5 : 1
  }

  return len
}

/**
 * 根据“视觉长度”截断文字
 *  - 中文算 1
 *  - 数字 / 英文 / 常见半角符号算 0.5
 */
export function sliceByVisualLength(str: string, maxLen: number, ellipsis: string = '') {
  let len = 0
  let result = ''

  for (const char of str) {
    const charLen = (char.codePointAt(0) as number) < 0x80 ? 0.5 : 1

    if (len + charLen > maxLen) break

    len += charLen
    result += char
  }

  return result.length < str.length ? result + ellipsis : result
}

/**
 * 居中头部标题的自适应字号: 视觉长度越长字号越小, 以显示更多文字
 *  - 16 为默认字号, 超长仍有 middle 省略兜底
 *
 * @param title 标题文本
 */
export function getHeaderTitleSize(title: string = '') {
  const visualLength = getVisualLength(title)
  if (visualLength >= 16) return 13
  if (visualLength >= 14) return 14
  if (visualLength >= 11) return 15
  return 16
}
