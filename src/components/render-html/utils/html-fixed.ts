/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * html 修正: 清理不支持的标签与转义, 修正引用块, 匹配媒体链接与 AC 搜索词条
 */
import { rakuenStore, systemStore } from '@stores'
import { HTMLDecode } from '@utils'
import { acSearch, getSubStrings } from '@utils/ac-search'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { s2t } from '@utils/thirdParty/open-cc'
import { IOS, URL_FEEDBACK } from '@constants'
import { REGS } from '../ds'
import { getIncreaseFontSize, getIncreaseLineHeight } from './font'

/** 转义正则特殊字符 */
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 跳过标签与已有链接区域, 只对其中的文本段做替换
 * - 词条若匹配进原有标签属性 (如时间戳 2022/7/5 命中 22/7), 插入的 <a> 会破坏属性引号配对, 导致解析出畸形节点
 */
function replaceOutsideTags(html: string, reg: RegExp, replacer: (match: string) => string) {
  const zoneReg = /<a\s[^>]*>[\s\S]*?<\/a>|<[^>]*>/gi
  let result = ''
  let last = 0
  let zone: RegExpExecArray | null

  while ((zone = zoneReg.exec(html))) {
    result += html.slice(last, zone.index).replace(reg, replacer)
    result += zone[0]
    last = zone.index + zone[0].length
  }
  result += html.slice(last).replace(reg, replacer)

  return result
}

/** 去除 html 标签、空行、换行 */
function removeHTMLTag(str: string) {
  return str.replace(/(<([^>]+)>)/gi, '').replace(/^\s*[\r\n]/gm, '')
}

/** 去除 q 里面的图片 (非常特殊的情况, 无法预测, 安卓 Text 里面不能包含其他元素) */
function removeQuote(html: string) {
  if (!IOS && html.includes('<q>')) {
    html = html.replace(REGS.q, (_match: string, q: string) => {
      let _q = q.replace(REGS.img, ' img')

      // 暂时没办法处理像 </smal... 结尾这样的情况
      // 因为之前的错误全局 HTMLDecode, 没办法再处理
      const match = _q.match(REGS.fixedQ)
      if (match) {
        _q = _q.slice(0, match.index)
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

/** 把 div.quote > q 转换为 blockquote, 解决 react-native-render-html 在 br 处断开 inline 元素的问题 */
function convertQuoteToBlockquote(html: string) {
  return html.replace(
    /<div class="quote"><q([^>]*)>([\s\S]*?)<\/q><\/div>/g,
    (_match, attrs, content) => `<blockquote${attrs}>${content}</blockquote>`
  )
}

/** 强制修改 html 以能被组件正常渲染 */
export function hackFixedHTMLTags(html: string) {
  return [
    HTMLDecode,
    removeQuote,
    removePre,
    smallQuote,
    convertQuoteToBlockquote,
    removeBrBetweenImages,
    removeSomeTags,
    htmlS2T,
    fixedWhiteTags
  ].reduce((acc, fn) => fn(acc), html)
}

/** 匹配主站部分主要页面链接, 把这些链接变成媒体块, 与行内文字独立 */
export function hackMatchMediaLink(html: string) {
  const { matchLink, acSearchV2: acSearchSetting } = rakuenStore.setting

  let htmlValue = html
  let flag: boolean

  if (matchLink) {
    htmlValue = html.replace(REGS.media, match => {
      // 客户端推广语不做单独块处理
      if (
        match.includes(
          `<a href="${URL_FEEDBACK}" target="_blank" rel="nofollow external noopener noreferrer" class="l"><`
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

      // acData 已按长度降序, alternation 会优先匹配更长的词
      const reg = new RegExp(acData.map(escapeRegExp).join('|'), 'g')
      htmlValue = replaceOutsideTags(htmlValue, reg, match =>
        substrings[match]
          ? `<a href="https://App/Subject/subjectId:${substrings[match]}">${match}</a>`
          : match
      )
    }
  }

  return htmlValue
}

export function fixedHtml(html: string = '') {
  return html.replace(/class="smile"\s+alt="\(bgm\d+\)"/g, (m: string) => {
    // m is like 'class="smile"   alt="(bgm124)"'
    return m.replace(/\s+alt=/, ' alt=')
  })
}
