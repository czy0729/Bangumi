/*
 * RN渲染HTML v2
 * @Doc https://github.com/archriss/react-native-render-html
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-25 16:44:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { cheerio, HTMLDecode } from '@utils/html'
import HTML from '../@/react-native-render-html'
import BgmText, { bgmMap } from '../bgm-text'
import { translateAll } from '../katakana'
import Error from './error'
import MaskText from './mask-text'
import QuoteText from './quote-text'
import LineThroughtText from './line-throught-text'
import HiddenText from './hidden-text'
import Li from './li'
import ToggleImage from './toggle-image'

// 一些超展开内容文本样式的标记
const spanMark = {
  mask: 'background-color:#555;',
  bold: 'font-weight:bold;',
  lineThrough: 'line-through;',
  hidden: 'visibility:hidden;'
}

export default
@observer
class RenderHtml extends React.Component {
  static defaultProps = {
    style: undefined,
    baseFontStyle: {},
    linkStyle: {},
    imagesMaxWidth: _.window.width - 2 * _.wind,
    html: '',
    autoShowImage: false,
    onLinkPress: Function.prototype,
    onImageFallback: Function.prototype
  }

  state = {
    error: false,
    katakanaResult: {}
  }

  async componentDidMount() {
    const { katakana, html } = this.props
    if (katakana) {
      const katakanaResult = await translateAll(html)
      if (katakanaResult) {
        this.setState({
          katakanaResult
        })
      }
    }
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  /**
   * 生成render-html配置
   */
  generateConfig = (imagesMaxWidth, baseFontStyle, linkStyle) => ({
    imagesMaxWidth: _.window.width,
    baseFontStyle: {
      ...this.defaultBaseFontStyle,
      ...baseFontStyle
    },
    tagsStyles: {
      a: {
        paddingRight: _.sm,
        color: _.colorMain,
        textDecorationColor: _.colorMain,
        ...linkStyle
      }
    },
    textSelectable: true,

    // 渲染定义tag前回调
    renderers: {
      img: ({ src = '' }, children, convertedCSSStyles, { key }) => {
        const { autoShowImage, onImageFallback } = this.props
        return (
          <ToggleImage
            key={key}
            style={{
              marginTop: 4
            }}
            src={src}
            autoSize={imagesMaxWidth}
            placeholder={false}
            imageViewer
            show={autoShowImage}
            onImageFallback={() => onImageFallback(src)}
          />
        )
      },
      span: (
        { style = '' },
        children,
        convertedCSSStyles,
        { rawChildren, key, baseFontStyle }
      ) => {
        try {
          // @todo 暂时没有对样式混合情况作出正确判断, 以重要程度优先(剧透 > 删除 > 隐藏 > 其他)
          // 防剧透字
          if (style.includes(spanMark.mask)) {
            const text = []
            const target = rawChildren[0]
            if (target) {
              if (target.children) {
                // 防剧透字中有表情
                target.children.forEach((item, index) => {
                  if (item.data) {
                    // 文字
                    text.push(item.data)
                  } else if (item.children) {
                    item.children.forEach((i, idx) => {
                      // 表情
                      text.push(
                        <BgmText
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${index}-${idx}`}
                          size={baseFontStyle.fontSize}
                          lineHeight={baseFontStyle.lineHeight}
                        >
                          {i.data}
                        </BgmText>
                      )
                    })
                  }
                })
              } else {
                // 防剧透字中没表情
                text.push(target.data)
              }
            }
            return (
              <MaskText
                key={key}
                style={{
                  ...this.defaultBaseFontStyle,
                  ...baseFontStyle
                }}
              >
                {text}
              </MaskText>
            )
          }

          // 删除字
          if (style.includes(spanMark.lineThrough)) {
            const target = rawChildren[0]
            const text =
              (target &&
                target.parent &&
                target.parent.children[0] &&
                target.parent.children[0].data) ||
              (target.children[0] && target.children[0].data) ||
              ''
            return (
              <LineThroughtText
                key={key}
                style={{
                  ...this.defaultBaseFontStyle,
                  ...baseFontStyle
                }}
              >
                {text}
              </LineThroughtText>
            )
          }

          // 隐藏字
          if (style.includes(spanMark.hidden)) {
            const target = rawChildren[0]
            const text = (target && target.data) || ''
            return (
              <HiddenText
                key={key}
                style={{
                  ...this.defaultBaseFontStyle,
                  ...baseFontStyle
                }}
              >
                {text}
              </HiddenText>
            )
          }
        } catch (error) {
          warn('RenderHtml', 'generateConfig', error)
        }

        return children
      },
      q: (attrs, children, convertedCSSStyles, { key }) => (
        <QuoteText key={key}>{children}</QuoteText>
      ),
      li: (attrs, children, convertedCSSStyles, { key }) => (
        <Li key={key}>{children}</Li>
      )
    }
  })

  onLinkPress = (evt, href) => {
    const { onLinkPress } = this.props
    if (onLinkPress) {
      onLinkPress(href)
    } else {
      open(href)
    }
  }

  formatHTML = () => {
    const { html, baseFontStyle } = this.props
    const { katakanaResult } = this.state
    try {
      // iOS碰到过文本里巨大会遇到Maximun stack size exceeded的错误
      // if (IOS && html.length > 100000) {
      //   return html
      // }

      let _html

      // 把bgm表情替换成bgm字体文字
      const $ = cheerio(html)
      $('img[smileid]').replaceWith((index, element) => {
        const $img = cheerio(element)
        const alt = $img.attr('alt') || ''
        if (alt) {
          // bgm偏移量24
          const index = parseInt(alt.replace(/\(bgm|\)/g, '')) - 24

          // 限制用户不显示bgm表情
          if (userStore.isLimit) {
            return alt
          }

          if (bgmMap[index]) {
            return `<span style="font-family:bgm;font-size:${
              baseFontStyle.fontSize || this.defaultBaseFontStyle.fontSize
            }px;line-height:${
              baseFontStyle.lineHeight || this.defaultBaseFontStyle.lineHeight
            }px;user-select:all">${bgmMap[index]}</span>`
          }
          return alt
        }
        return $img.html()
      })
      _html = $.html()

      // 片假名后面加上小的英文
      const jps = Object.keys(katakanaResult)
      if (jps.length) {
        jps.forEach(jp => {
          const reg = new RegExp(jp, 'g')
          _html = _html.replace(
            reg,
            `${jp}<span style="font-size: 10px"> (${katakanaResult[jp]}) </span>`
          )
        })
      }

      // 给纯文字包上span, 否则安卓不能自由复制
      _html = `<div>${_html}</div>`
      const match = _html.match(/>[^<>]+?</g)
      if (match) {
        match.forEach(
          item => (_html = _html.replace(item, `><span${item}/span><`))
        )
      }

      _html = _html.replace(
        /<div class="quote"><q>/g,
        '<div class="quote"><q style="font-size: 12px">'
      )

      return HTMLDecode(_html)
    } catch (error) {
      warn('RenderHtml', 'formatHTML', error)
      return html
    }
  }

  /**
   * @issue iOS开发遇到奇怪bug, 文字太多当lineHeight大于15, 不显示?
   */
  get defaultBaseFontStyle() {
    return {
      fontSize: 15 + _.fontSizeAdjust,
      lineHeight: 24,
      color: _.colorTitle
    }
  }

  render() {
    const {
      style,
      baseFontStyle,
      linkStyle,
      imagesMaxWidth,
      html,
      autoShowImage,
      onLinkPress,
      ...other
    } = this.props
    const { error } = this.state
    if (error) {
      return <Error />
    }

    return (
      <View style={style}>
        <HTML
          html={this.formatHTML()}
          baseFontStyle={{
            ...this.defaultBaseFontStyle,
            ...baseFontStyle
          }}
          onLinkPress={this.onLinkPress}
          {...this.generateConfig(imagesMaxWidth, baseFontStyle, linkStyle)}
          {...other}
        />
      </View>
    )
  }
}
