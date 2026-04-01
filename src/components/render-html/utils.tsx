/*
 * @Author: czy0729
 * @Date: 2021-09-14 20:53:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-02 06:47:23
 */
import { _, rakuenStore, subjectStore, systemStore } from '@stores'
import { cheerio, HTMLDecode, sleep } from '@utils'
import { acSearch, getSubStrings } from '@utils/ac-search'
import { logger } from '@utils/dev'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { s2t } from '@utils/thirdParty/open-cc'
import { IOS, WEB } from '@constants'
import { BGM_MAP, getBgmFontFamily } from '../bgm-text'
import { COMPONENT, PAD_FONT_ZISE_INCREASE, PAD_LINE_HEIGHT_INCREASE, REGS } from './ds'

import type { TextStyle } from '@types'

/** 处理 html 格式 */
export function formatHtml(
  html = '',
  baseFontStyle: TextStyle,
  matchLink: boolean,
  katakanaResult: Record<string, string>
) {
  try {
    const $ = cheerio(fixedHtml(html))
    let htmlValue = html

    if (!WEB) {
      // 把小电视表情替换成客户端自定义的字体文字
      $('img[smileid]').replaceWith((_index: number, element: any) => {
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
            const emoji = BGM_MAP[finalIndex]
            if (emoji) {
              const fontFamily = getBgmFontFamily(finalIndex)
              const isLg = finalIndex >= 600

              const { fontSize, lineHeight } = fixedBaseFontStyle(baseFontStyle)
              const bigEmojiSize = `fontSize${rakuenStore.setting.bigEmojiSize}`
              const styles = [
                `font-family:${fontFamily}`,
                'user-select:all',
                fontSize > 0 ? `font-size:${isLg ? _[bigEmojiSize].fontSize : fontSize}px` : '',
                lineHeight > 0
                  ? `line-height:${isLg ? _[bigEmojiSize].lineHeight : lineHeight}px`
                  : ''
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
      $('span.bmo').replaceWith((_index: number, element: any) => {
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
    logger.info(COMPONENT, 'formatHTML', error)
    return HTMLDecode(html)
  }
}

/** 获取最后字体渲染基本样式 */
export function fixedBaseFontStyle(baseFontStyle: TextStyle = {}) {
  const style = _.flatten(baseFontStyle) || {}
  if (!_.isPad) return style

  const fixedStyle = { ...style }
  if (fixedStyle.fontSize) fixedStyle.fontSize += PAD_FONT_ZISE_INCREASE
  if (fixedStyle.lineHeight) fixedStyle.lineHeight += PAD_LINE_HEIGHT_INCREASE

  return fixedStyle
}

/** 字符串样式转换成 RN 样式 */
export function formatStyles(styleStr: string) {
  const rnStyle: { [key: string]: any } = {}
  if (!styleStr) return rnStyle

  styleStr.split(';').forEach(item => {
    const [key, value] = item.split(':')
    if (key && value) {
      const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase())
      const rawValue = value.trim().replace('px', '')
      const numValue = Number(rawValue)
      rnStyle[camelKey] = isNaN(numValue) ? rawValue : numValue
    }
  })
  return rnStyle
}

/**
 * 将含有 Bangumi 动态表情的 HTML 字符串分割成片段
 * - 识别大表情（600-999）并作为独立块或吸附块处理。
 * - 大表情会尝试“吞噬”前后小于 SPLIT_LENGTH 的短文本，使其共享大行高。
 * - 块级元素（div/q/blockquote）的闭合标签会触发物理分割，防止引用块与后续回复混淆。
 */
export function splitHtmlByEmoji(html: string, splitLength: number = 12) {
  if (!html) return []

  // 0. 如果没有大表情就直接返回
  const hasBigEmoji = /font-family:bgm[^>]*?>(?:6|7|8|9)\d{2}<\/span>/i.test(html)
  if (!hasBigEmoji) return [trimBR(html)].filter(Boolean)

  // 1. 初始切分：匹配大表情、换行符、以及块级元素的结束标签
  // 增加 <\/div> 等捕获，是为了防止引用块内容与后面的追问文字粘连
  const regex =
    /((?:<span [^>]*?font-family:bgm[^>]*?>(?:6|7|8|9)\d{2}<\/span>)+|(?:\r\n|\n|\r)|<br\s*\/?>|<\/(?:div|q|blockquote)>)/gi
  const rawSegments = html.split(regex).filter(item => item !== '' && item !== undefined)
  if (rawSegments.length <= 1) return [trimBR(html)].filter(Boolean)

  const smartSegments: string[] = []
  let buffer = ''

  /** 辅助：移除片段首尾的冗余换行 */
  function trimBR(str: string) {
    return str.replace(/^(?:<br\s*\/?>|\n|\r)+|(?:<br\s*\/?>|\n|\r)+$/gi, '').trim()
  }

  for (let i = 0; i < rawSegments.length; i++) {
    const seg = rawSegments[i]
    const isEmoji = /font-family:bgm[^>]*?>(?:6|7|8|9)\d{2}<\/span>/i.test(seg)
    const isBR = /<br\s*\/?>|\n/i.test(seg)
    const isBlockEnd = /^<\/(div|q|blockquote)>$/i.test(seg)

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
        const isNextBR = /<br\s*\/?>|\n/i.test(nextSeg)
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
          const nextIsEmoji = /font-family:bgm[^>]*?>(?:6|7|8|9)\d{2}<\/span>/i.test(nextSeg)
          const nextLen = getEffectiveTextLength(nextSeg)

          if (nextIsEmoji) {
            shouldHoldBR = true
          } else if (nextLen <= splitLength && thirdSeg) {
            // 检查“换行 + 短文字 + 表情”的结构
            const thirdIsEmoji = /font-family:bgm[^>]*?>(?:6|7|8|9)\d{2}<\/span>/i.test(thirdSeg)
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

/** 存放等待发起获取媒体信息的 id */
const IDS = []

/** 已获取过媒体信息的 id */
const LOADED_IDS = []

/** 是否获取中 */
let loading = false

/** 列队请求媒体信息 */
export async function fetchMediaQueue(
  type?: string,
  id?: unknown,
  onLoaded?: (result?: boolean) => void
) {
  if (type && id) {
    // 针对 chrome 的「复制指向突出显示的内容的链接」, 清理 key
    id = String(id).split('#')?.[0]

    if (
      IDS.length <= 16 &&
      ![...IDS, ...LOADED_IDS].find(item => item.type === type && item.id === id)
    ) {
      IDS.push({
        type,
        id
      })
    }
  }

  if (!IDS.length) return

  if (!loading) {
    const item = IDS.shift()
    LOADED_IDS.push(item)

    try {
      logger.log(`${COMPONENT}/utils/fetchMediaQueue`, IDS, item)

      loading = true
      if (item.type === 'subject') {
        const result = await subjectStore.fetchSubjectSnapshot(item.id)
        onLoaded(result)
      } else if (item.type === 'topic') {
        const result = await rakuenStore.fetchTopicSnapshot(item.id)
        onLoaded(result)
      } else if (item.type === 'mono') {
        await subjectStore.fetchMono(item.id)
      }

      await sleep()
      loading = false

      fetchMediaQueue()
    } catch (error) {
      loading = false
    }
  }
}

/** 获取最后字体渲染字号大小 */
function getIncreaseFontSize(fontSize: number) {
  if (!fontSize || !_.isPad) return fontSize
  return Number(fontSize) + PAD_FONT_ZISE_INCREASE
}

/** 获取最后字体渲染行高大小 */
function getIncreaseLineHeight(lineHeight: number) {
  if (!lineHeight || !_.isPad) return lineHeight
  return Number(lineHeight) + PAD_LINE_HEIGHT_INCREASE
}

/** 去除 q 里面的图片 (非常特殊的情况, 无法预测, 安卓 Text 里面不能包含其他元素) */
function removeQuote(html: string) {
  if (!IOS && html.includes('<q>')) {
    html = html.replace(REGS.q, (_match, q) => {
      let _q = q.replace(REGS.img, ' img')

      // 暂时没办法处理像 </smal... 结尾这样的情况
      // 因为之前的错误全局 HTMLDecode, 没办法再处理
      if (REGS.fixedQ.test(_q)) {
        const { index } = _q.match(REGS.fixedQ)
        _q = _q.slice(0, index)
      }

      return `<q>${_q}</span></q>`
    })
  }
  return html
}

/** 安卓识别 pre 目前报错, 暂时屏蔽此标签 */
function removePre(html: string) {
  if (!IOS && html.includes('<pre>')) {
    html = html.replace(REGS.pre, '<div>').replace(REGS.preR, '</div>')
  }
  return html
}

/** 缩小引用的字号 */
function smallQuote(html: string) {
  if (REGS.divQ.test(html)) {
    html = html.replace(
      REGS.divQ,
      `<div class="quote"><q style="font-size: ${getIncreaseFontSize(
        12
      )}px; line-height: ${getIncreaseLineHeight(16)}px">`
    )
  }
  return html
}

/** 去除图片之间的 br */
function removeBrBetweenImages(html: string) {
  return html.replace(REGS.imgBr, '<img')
}

/** 去除暂时无法支持的 html */
function removeSomeTags(html: string) {
  return html.replace(REGS.ruby, '')
}

/** 简转繁 */
function htmlS2T(html: string) {
  const { s2t: _s2t } = systemStore.setting
  if (_s2t) html = s2t(decoder(html))
  return html
}

/** 转义 bug, 因一开始错误把整体转义过一次, 导致只能手动把左边的非合法标签 '<' 转义规避报错 */
function fixedWhiteTags(html: string) {
  return html.replace(REGS.whiteTags, '&lt;')
}

/** 强制修改 html 以能被组件正常渲染 */
function hackFixedHTMLTags(html: string) {
  let htmlValue = HTMLDecode(html)
  htmlValue = removeQuote(htmlValue)
  htmlValue = removePre(htmlValue)
  htmlValue = smallQuote(htmlValue)
  htmlValue = removeBrBetweenImages(htmlValue)
  htmlValue = removeSomeTags(htmlValue)
  htmlValue = htmlS2T(htmlValue)
  return fixedWhiteTags(htmlValue)
}

/** 去除 html 标签、空行、换行 */
function removeHTMLTag(str: string) {
  return str.replace(/(<([^>]+)>)/gi, '').replace(/^\s*[\r\n]/gm, '')
}

/** 匹配 bgm 部分页面链接, 把这些链接变成 Media 块, 与行内文字独立 */
function hackMatchMediaLink(html: string) {
  const { matchLink, acSearchV2: acSearchSetting } = rakuenStore.setting

  let htmlValue = html
  let flag: boolean

  if (matchLink) {
    htmlValue = html.replace(REGS.media, match => {
      // App 推广语不做单独块处理
      if (
        match.includes(
          '<a href="https://bgm.tv/group/topic/350677" target="_blank" rel="nofollow external noopener noreferrer" class="l"><'
        )
      ) {
        return match
      }

      flag = true
      return `<div>${match}</div>`
    })
  }

  // 防止两个连续的 Media 块中间产生大间隔
  if (flag) {
    return htmlValue.replace(/<\/div><br><div>/g, '</div><div>')
  }

  // [实验性] 文字猜测条目并替换成链接
  if (acSearchSetting) {
    const htmlNoTags = htmlValue.replace(REGS.quote, '').replace(REGS.a, '')

    const acData = acSearch(removeHTMLTag(htmlNoTags))
    if (Array.isArray(acData) && acData.length) {
      const substrings = getSubStrings()
      acData.forEach((item, index) => {
        htmlValue = htmlValue.replace(item, `##${index}##`)
      })
      acData.forEach((item, index) => {
        htmlValue = htmlValue.replace(
          `##${index}##`,
          `<a href="https://App/Subject/subjectId:${substrings[item]}">${item}</a>`
        )
      })
    }
  }

  return htmlValue
}

function fixedHtml(html = '') {
  return html.replace(/class="smile"\s+alt="\(bgm\d+\)"/g, m => {
    // m is like 'class="smile"   alt="(bgm124)"'
    return m.replace(/\s+alt=/, ' alt=')
  })
}
