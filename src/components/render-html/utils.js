/*
 * @Author: czy0729
 * @Date: 2021-09-14 20:53:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-22 06:50:55
 */
import { _, systemStore } from '@stores'
import { HTMLDecode } from '@utils/html'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { s2t } from '@utils/thirdParty/cn-char'
import { IOS, PAD } from '@constants'

export const padFontSizeIncrease = PAD === 2 ? 3 : 2
export const padLineHeightIncrease = PAD === 2 ? 10 : 4
export const regs = {
  bgm: /\(bgm|\)/g,
  divQ: /<div class="quote"><q>/g,
  fixedQ: /<\/(.+?)\.\.\.<\/span>$/,
  img: /<img/g,
  imgBr: /<br><img/g,
  pre: /<pre>/g,
  preR: /<\/pre>/g,
  q: /<q>(.+?)<\/q>/g,
  ruby: /<ruby>(.+?)<\/ruby>/g,
  whiteTags:
    /<(?!\/?(div|a|p|span|h1|h2|h3|h4|h5|strong|em|small|hr|br|q|img|ol|ul|li))/g
}

export function getIncreaseFontSize(fontSize) {
  if (!fontSize || !_.isPad) return fontSize
  return Number(fontSize) + padFontSizeIncrease
}

export function getIncreaseLineHeight(lineHeight) {
  if (!lineHeight || !_.isPad) return lineHeight
  return Number(lineHeight) + padLineHeightIncrease
}

export function fixedBaseFontStyle(baseFontStyle = {}) {
  if (!_.isPad) return baseFontStyle

  const _baseFontStyle = {
    ...baseFontStyle
  }
  if (_baseFontStyle.fontSize) _baseFontStyle.fontSize += padFontSizeIncrease
  if (_baseFontStyle.lineHeight) {
    _baseFontStyle.lineHeight += padLineHeightIncrease
  }

  return _baseFontStyle
}

export function hackFixedHTMLTags(html) {
  let _html = html

  /**
   * 给纯文字包上span, 否则安卓不能自由复制
   */
  // _html = `<div>${_html}</div>`
  // const match = _html.match(/>[^<>]+?</g)
  // if (match) {
  //   match.forEach(item => (_html = _html.replace(item, `><span${item}/span><`)))
  // }

  /**
   * 去除<q>里面的图片
   * (非常特殊的情况, 无法预测, 安卓Text里面不能包含其他元素)
   */
  if (!IOS) {
    if (_html.includes('<q>')) {
      _html = HTMLDecode(_html).replace(regs.q, (match, q) => {
        let _q = q.replace(regs.img, ' img')

        // 暂时没办法处理像 </smal...结尾这样的情况
        // 因为之前的错误全局HTMLDecode, 没办法再处理
        if (regs.fixedQ.test(_q)) {
          const { index } = _q.match(regs.fixedQ)
          _q = _q.slice(0, index)
        }
        return `<q>${_q}</span></q>`
      })
    }
  }

  /**
   * 安卓识别<pre>目前报错, 暂时屏蔽此标签
   */
  if (!IOS) {
    if (_html.includes('<pre>')) {
      _html = HTMLDecode(_html).replace(regs.pre, '<div>').replace(regs.preR, '</div>')
    }
  }

  /**
   * 缩小引用的字号
   */
  if (regs.divQ.test(_html)) {
    _html = _html.replace(
      regs.divQ,
      `<div class="quote"><q style="font-size: ${getIncreaseFontSize(
        12
      )}px; line-height: ${getIncreaseLineHeight(16)}px">`
    )
  }

  /**
   * 去除图片之间的br
   */
  _html = _html.replace(regs.imgBr, '<img')

  /**
   * 去除暂时无法支持的html
   */
  _html = _html.replace(regs.ruby, '')

  /**
   * 转义bug
   */
  // _html = _html.replace(/<;/g, '< ;')

  const { s2t: _s2t } = systemStore.setting
  if (_s2t) _html = s2t(decoder(_html))

  /**
   * 转义bug
   * 因一开始错误把整体转义过一次, 导致只能手动把左边的非合法标签'<'转义规避报错
   */
  return HTMLDecode(_html).replace(regs.whiteTags, '&lt;')
}

/**
 * 匹配bgm部分页面链接, 把这些链接变成Media块, 与行内文字独立
 * @param {*} html
 */
export function hackMatchMediaLink(html) {
  const _html = html.replace(
    /<a href="https:\/\/(bgm|bangumi).tv\/subject\/\d+" target="_blank" rel="nofollow external noopener noreferrer" class="l">(.+?)<\/a>/g,
    match => {
      return `<div>${match}</div>`
    }
  )

  // 防止两个连续的Media块中间产生大间隔
  return _html.replace(/<\/div><br><div>/g, '</div><div>')
}
