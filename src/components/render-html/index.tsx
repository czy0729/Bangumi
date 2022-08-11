/*
 * RN渲染HTML v2
 * @Doc https://github.com/archriss/react-native-render-html
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 13:23:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { cheerio, HTMLDecode } from '@utils/html'
import { AnyObject, TextStyle } from '@types'
import HTML from '../@/react-native-render-html'
import { a } from '../@/react-native-render-html/src/HTMLRenderers'
import { BgmText, bgmMap } from '../bgm-text'
import { translateAll } from '../katakana/utils'
import Error from './error'
import MaskText from './mask-text'
import QuoteText from './quote-text'
import LineThroughtText from './line-throught-text'
import HiddenText from './hidden-text'
import Li from './li'
import A from './a'
import ToggleImage from './toggle-image'
import {
  padFontSizeIncrease,
  padLineHeightIncrease,
  regs,
  getIncreaseFontSize,
  fixedBaseFontStyle,
  hackFixedHTMLTags,
  hackMatchMediaLink
} from './utils'
import { SPAN_MARK } from './ds'
import { Props as RenderHtmlProps } from './types'
import { IOS } from '@constants'

export { RenderHtmlProps }

export const RenderHtml = observer(
  class RenderHtmlComponent extends React.Component<RenderHtmlProps> {
    static defaultProps = {
      style: undefined,
      baseFontStyle: {},
      linkStyle: {},
      imagesMaxWidth: _.window.width - 2 * _.wind,
      html: '',
      autoShowImage: false,
      matchLink: false,
      onLinkPress: () => {},
      onImageFallback: () => {}
    }

    state = {
      error: false,
      katakanaResult: {}
    }

    async componentDidMount() {
      const { katakana, html } = this.props
      if (katakana) {
        const { katakana: settingKatakana } = this.setting
        if (settingKatakana) {
          const katakanaResult = await translateAll(html)
          if (katakanaResult) {
            this.setState({
              katakanaResult
            })
          }
        }
      }
    }

    componentDidCatch(error) {
      this.setState({
        error: true
      })
      console.error('@/components/render-html', 'componentDidCatch', error)
    }

    /** 生成 render-html 配置 */
    generateConfig = (imagesMaxWidth, baseFontStyle, linkStyle, matchLink) => ({
      imagesMaxWidth: _.window.width,
      baseFontStyle: {
        ...this.defaultBaseFontStyle,
        ...fixedBaseFontStyle(baseFontStyle)
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
              style={_.mt.xs}
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
            if (style.includes(SPAN_MARK.mask)) {
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
                      const _baseFontStyle: TextStyle =
                        fixedBaseFontStyle(baseFontStyle)
                      item.children.forEach((i, idx) => {
                        // 表情
                        text.push(
                          <BgmText
                            key={`${index}-${idx}`}
                            size={_baseFontStyle.fontSize}
                            lineHeight={_baseFontStyle.lineHeight}
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
            if (style.includes(SPAN_MARK.lineThrough)) {
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
            if (style.includes(SPAN_MARK.hidden)) {
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
            console.info('RenderHtml', 'generateConfig', error)
          }

          return children
        },
        q: (attrs, children, convertedCSSStyles, { key }) => (
          <QuoteText key={key}>{children}</QuoteText>
        ),
        li: (attrs, children, convertedCSSStyles, { key }) => (
          <Li key={key}>{children}</Li>
        ),
        a: matchLink
          ? (attrs, children, convertedCSSStyles, passProps) => (
              <A
                key={passProps.key}
                style={{
                  ...this.defaultBaseFontStyle,
                  ...baseFontStyle,
                  maxWidth: imagesMaxWidth
                }}
                attrs={attrs}
                passProps={passProps}
                onPress={this.onLinkPress}
              >
                {children}
              </A>
            )
          : a
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
      const { html, baseFontStyle, matchLink } = this.props
      const { katakanaResult } = this.state

      try {
        /**
         * iOS碰到过文本里巨大会遇到Maximun stack size exceeded的错误
         */
        // if (IOS && html.length > 100000) return html

        let _html = html

        /**
         * 把bgm表情替换成bgm字体文字
         */
        const $ = cheerio(html)
        $('img[smileid]').replaceWith((index, element) => {
          const $img = cheerio(element)
          const alt = $img.attr('alt') || ''
          if (alt) {
            // bgm偏移量24
            const index = parseInt(alt.replace(regs.bgm, '')) - 24

            // 限制用户不显示bgm表情
            // if (userStore.isLimit) {
            //   return alt
            // }

            if (bgmMap[index]) {
              const _baseFontStyle: TextStyle = fixedBaseFontStyle(baseFontStyle)
              return `<span style="font-family:bgm;font-size:${
                _baseFontStyle.fontSize || this.defaultBaseFontStyle.fontSize
              }px;line-height:${
                _baseFontStyle.lineHeight || this.defaultBaseFontStyle.lineHeight
              }px;user-select:all">${bgmMap[index]}</span>`
            }
            return alt
          }
          return $img.html()
        })
        _html = $.html()

        /**
         * 片假名后面加上小的英文
         */
        const jps = Object.keys(katakanaResult)
        if (jps.length) {
          jps.forEach(jp => {
            const reg = new RegExp(jp, 'g')
            _html = _html.replace(
              reg,
              `${jp}<span style="font-size: ${getIncreaseFontSize(10)}px"> (${
                katakanaResult[jp]
              }) </span>`
            )
          })
        }

        _html = hackFixedHTMLTags(_html)
        return matchLink ? hackMatchMediaLink(_html) : _html
      } catch (error) {
        console.info('RenderHtml', 'formatHTML', error)
        return HTMLDecode(html)
      }
    }

    /**
     * @issue iOS开发遇到奇怪bug, 文字太多当lineHeight大于15, 不显示?
     */
    get defaultBaseFontStyle() {
      const styles: AnyObject = {
        fontSize: 15 + _.fontSizeAdjust + (_.isPad ? padFontSizeIncrease : 0),
        lineHeight: 24 + (_.isPad ? padLineHeightIncrease : 0),
        color: _.colorTitle
      }
      if (!IOS) styles.fontFamily = 'rhrm'
      return styles
    }

    get setting() {
      return systemStore.setting
    }

    render() {
      const {
        style,
        baseFontStyle,
        linkStyle,
        imagesMaxWidth,
        html,
        autoShowImage,
        matchLink,
        onLinkPress,
        ...other
      } = this.props
      const { error } = this.state
      if (error) return <Error />

      const _baseFontStyle = fixedBaseFontStyle(baseFontStyle)
      return (
        <View style={style}>
          <HTML
            html={this.formatHTML()}
            baseFontStyle={{
              ...this.defaultBaseFontStyle,
              ..._baseFontStyle
            }}
            onLinkPress={this.onLinkPress}
            {...this.generateConfig(
              imagesMaxWidth,
              _baseFontStyle,
              linkStyle,
              matchLink
            )}
            {...other}
          />
        </View>
      )
    }
  }
)
