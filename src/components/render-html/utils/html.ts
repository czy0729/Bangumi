/*
 * @Author: czy0729
 * @Date: 2021-09-14 20:53:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 21:22:05
 *
 * html 处理: 表情与片假名替换、按大表情分片
 */
import { _, rakuenStore } from '@stores'
import { cheerio, HTMLDecode } from '@utils'
import { logger } from '@utils/dev'
import { WEB } from '@constants'
import { REGS } from '../ds'
import { BGM_MAP, getBgmFontFamily } from '../../bgm-text'
import { fixedBaseFontStyle, getIncreaseFontSize } from './font'
import { fixedHtml, hackFixedHTMLTags, hackMatchMediaLink } from './html-fixed'
import { COMPONENT } from './ds'

import type { TextStyle } from '@types'

const TAG = `${COMPONENT}/html` as const

/** 处理 html 格式 */
export function formatHtml(
  html: string = '',
  baseFontStyle: TextStyle,
  matchLink: boolean,
  katakanaResult: Record<string, string>
) {
  try {
    const $ = cheerio(fixedHtml(html))
    let htmlValue = html

    if (!WEB) {
      // 把小电视表情替换成客户端自定义的字体文字
      $('img[smileid]').replaceWith((_index, element) => {
        const $img = cheerio(element)
        const alt = $img.attr('alt') || ''
        let finalIndex: number

        if (alt) {
          const key = alt.replace(/[()]/g, '').trim()
          if (key.startsWith('musume_')) {
            const num = key.replace('musume_', '')
            finalIndex = Number(`6${num}`)
          } else if (key.startsWith('blake_')) {
            const num = key.replace('blake_', '')
            finalIndex = Number(`7${num}`)
          } else if (key.startsWith('bgm')) {
            finalIndex = Number(key.replace('bgm', ''))
          }

          if (finalIndex) {
            const emoji = (BGM_MAP as Record<number, string | undefined>)[finalIndex]
            if (emoji) {
              const fontFamily = getBgmFontFamily(finalIndex)
              const isLg = finalIndex >= 600

              const { fontSize, lineHeight } = fixedBaseFontStyle(baseFontStyle)
              const bigEmojiSize = `fontSize${rakuenStore.setting.bigEmojiSize}`
              const emojiSize = _[bigEmojiSize] as { fontSize: number; lineHeight: number }
              const styles = [
                `font-family:${fontFamily}`,
                'user-select:all',
                fontSize > 0 ? `font-size:${isLg ? emojiSize.fontSize : fontSize}px` : '',
                lineHeight > 0 ? `line-height:${isLg ? emojiSize.lineHeight : lineHeight}px` : ''
              ]
                .filter(Boolean)
                .join(';')

              return `<span style="${styles}">${finalIndex}</span>`
            }

            // BMO 暂不处理, 直接输出纯文本
            return alt
          }
        }

        return $img.html()
      })

      // 暂时处理一下 BMO
      $('span.bmo').replaceWith((_index, element) => {
        const $span = cheerio(element)
        const code = $span.attr('data-code')
        if (code) return `<span class="bmo" data-code="${code}">${code}</span>`

        return $span.toString()
      })
    }

    htmlValue = $.html()

    // 片假名后面加上小的英文
    const jps = Object.keys(katakanaResult)
    if (jps.length) {
      jps.forEach(jp => {
        const reg = new RegExp(jp, 'g')
        htmlValue = htmlValue.replace(
          reg,
          `${jp}<span style="font-size: ${getIncreaseFontSize(10)}px"> (${
            katakanaResult[jp]
          }) </span>`
        )
      })
    }

    htmlValue = hackFixedHTMLTags(htmlValue)
    return matchLink ? hackMatchMediaLink(htmlValue) : htmlValue
  } catch (error) {
    logger.info(TAG, 'formatHTML', error)
    return HTMLDecode(html)
  }
}

/** 移除片段首尾的冗余换行 */
function trimBR(str: string) {
  return str.replace(/^(?:<br\s*\/?>|\n|\r)+|(?:<br\s*\/?>|\n|\r)+$/gi, '').trim()
}

/**
 * 将含有 Bangumi 动态表情的 HTML 字符串分割成片段
 * - 识别大表情（600-999）并作为独立块或吸附块处理。
 * - 大表情会尝试”吞噬”前后小于 SPLIT_LENGTH 的短文本，使其共享大行高。
 * - 块级元素（div/q/blockquote）的闭合标签会触发物理分割，防止引用块与后续回复混淆。
 */
export function splitHtmlByEmoji(html: string, splitLength: number = 12) {
  if (!html) return []

  // 0. 如果没有大表情就直接返回
  const hasBigEmoji = REGS.emoji.test(html)
  if (!hasBigEmoji) return [trimBR(html)].filter(Boolean)

  // 1. 初始切分：匹配大表情、换行符、以及块级元素的结束标签
  // 增加 <\/div> 等捕获，是为了防止引用块内容与后面的追问文字粘连
  const regex =
    /((?:<span [^>]*?font-family:bgm[^>]*?>(?:6|7|8|9)\d{2}<\/span>)+|(?:\r\n|\n|\r)|<br\s*\/?>|<\/(?:div|q|blockquote)>)/gi
  const rawSegments = html.split(regex).filter(item => item !== '' && item !== undefined)
  if (rawSegments.length <= 1) return [trimBR(html)].filter(Boolean)

  const smartSegments: string[] = []
  let buffer = ''
  let insideQuote = false // 追踪是否在引用块内部

  for (let i = 0; i < rawSegments.length; i++) {
    const seg = rawSegments[i]
    const isEmoji = REGS.emoji.test(seg)
    const isBR = REGS.br.test(seg)
    const isBlockEnd = REGS.blockEnd.test(seg)

    // 追踪引用块标签的进入和离开
    if (REGS.quoteOpen.test(seg) || REGS.blockquoteOpen.test(seg)) {
      insideQuote = true
    }
    if (REGS.quoteClose.test(seg) || REGS.blockquoteClose.test(seg)) {
      insideQuote = false
    }

    // 在引用块内部, 所有内容保持在同一 buffer 中, 直到遇到闭合标签
    if (insideQuote && !isBlockEnd) {
      buffer += seg
      continue
    }

    // 情况 A：遇到大表情
    if (isEmoji) {
      // --- 向前吸附检查 ---
      const prevLen = getEffectiveTextLength(buffer)
      if (buffer && prevLen > splitLength) {
        // 如果前面的文字太长，先结算掉文字，不让表情影响长文行高
        smartSegments.push(trimBR(buffer))
        buffer = seg
      } else {
        // 如果前面是短文字或为空，直接合体
        buffer += seg
      }

      // --- 向后吸附检查 ---
      let nextIdx = i + 1
      while (nextIdx < rawSegments.length) {
        const nextSeg = rawSegments[nextIdx]
        const isNextBR = REGS.br.test(nextSeg)
        const nextLen = getEffectiveTextLength(nextSeg)

        if (isNextBR) {
          // 吸附表情后的第一个换行，然后结算
          buffer += nextSeg
          nextIdx++
          break
        } else if (nextLen <= splitLength) {
          // 后方也是短文字，吸过来
          buffer += nextSeg
          nextIdx++
        } else {
          // 遇到长文字或块级元素，停止吸附
          break
        }
      }

      smartSegments.push(trimBR(buffer))
      buffer = ''
      i = nextIdx - 1
    }

    // 情况 B：换行 或 块级元素闭合
    else if (isBR || isBlockEnd) {
      if (isBlockEnd) {
        // 块级闭合是物理隔断，带上标签一起结算
        if (buffer) {
          smartSegments.push(trimBR(buffer + seg))
        } else {
          smartSegments.push(seg)
        }
        buffer = ''
      } else if (isBR) {
        // --- 换行符预读检查 ---
        // 探测换行后是否紧跟“短文本+大表情”，若是则允许换行符留在 buffer 中等待吸附
        let shouldHoldBR = false
        const nextSeg = rawSegments[i + 1]
        const thirdSeg = rawSegments[i + 2]

        if (nextSeg) {
          const nextIsEmoji = REGS.emoji.test(nextSeg)
          const nextLen = getEffectiveTextLength(nextSeg)

          if (nextIsEmoji) {
            shouldHoldBR = true
          } else if (nextLen <= splitLength && thirdSeg) {
            // 检查”换行 + 短文字 + 表情”的结构
            const thirdIsEmoji = REGS.emoji.test(thirdSeg)
            if (thirdIsEmoji) shouldHoldBR = true
          }
        }

        if (shouldHoldBR) {
          buffer += seg
        } else {
          // 无表情吸附需求的普通换行，执行物理分割
          if (buffer) {
            smartSegments.push(trimBR(buffer))
            buffer = ''
          }
          smartSegments.push(seg)
        }
      }
    }

    // 情况 C：普通文字内容
    else {
      const currentLen = getEffectiveTextLength(seg)
      if (currentLen > splitLength) {
        // 长文字单独成块
        if (buffer) smartSegments.push(trimBR(buffer))
        smartSegments.push(trimBR(seg))
        buffer = ''
      } else {
        // 短文字存入 buffer 等待表情吸附或后续结算
        buffer += seg
      }
    }
  }

  if (buffer) smartSegments.push(trimBR(buffer))

  return smartSegments.filter(Boolean)
}

/**
 * 获取 HTML 的有效参考长度
 * - 探测块级开始标签：如果包含 div/q/blockquote，视为极长（强制分割）。
 * - 正常文字：返回去标签后的 trim 长度。
 */
function getEffectiveTextLength(html: string) {
  if (!html) return 0

  // 匹配开始标签即可，闭合标签已在 split 阶段处理
  if (/<(?:div|q|blockquote)/i.test(html)) {
    return 999
  }
  return html.replace(/<[^>]+>/g, '').trim().length
}
