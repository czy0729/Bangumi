/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 22:49:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { cheerio, HTMLDecode, open } from '@utils'
import { logger, r } from '@utils/dev'
import { FROZEN_FN, WEB } from '@constants'
import { Component } from '../component'
import HTML from '../@/react-native-render-html'
import { a as originA } from '../@/react-native-render-html/src/HTMLRenderers'
import { BGM_MAP, getBgmMiddleFrame } from '../bgm-text'
import { ErrorBoundary } from '../error-boundary'
import { translateAll } from '../katakana/utils'
import Error from './error'
import { a, img, li, q, span, ul } from './renderer'
import {
  fixedBaseFontStyle,
  fixedHtml,
  getIncreaseFontSize,
  hackFixedHTMLTags,
  hackMatchMediaLink
} from './utils'
import { COMPONENT, PAD_FONT_ZISE_INCREASE, REGS } from './ds'
import { styles } from './styles'

import type { Props as RenderHtmlProps } from './types'

export type { RenderHtmlProps }

/**
 * react-native 中渲染 html
 * @doc https://github.com/archriss/react-native-render-html
 */
export const RenderHtml = observer(
  class RenderHtmlComponent extends React.Component<RenderHtmlProps> {
    static defaultProps: RenderHtmlProps = {
      style: undefined,
      baseFontStyle: {},
      linkStyle: {},
      imagesMaxWidth: _.window.width - 2 * _.wind,
      html: '',
      autoShowImage: false,
      matchLink: false,
      onLinkPress: FROZEN_FN,
      onImageFallback: FROZEN_FN
    }

    state = {
      error: false,
      katakanaResult: {}
    }

    async componentDidMount() {
      if (this.props.katakana && systemStore.setting.katakana) {
        const katakanaResult = await translateAll(this.props.html)
        if (katakanaResult) {
          this.setState({
            katakanaResult
          })
        }
      }
    }

    componentDidCatch(error: Error) {
      this.setState({
        error: true
      })
      logger.error(COMPONENT, 'componentDidCatch', error)
    }

    /** 生成 render-html 配置 */
    generateConfig = (
      imagesMaxWidth: number,
      baseFontStyle: any,
      linkStyle: any,
      matchLink: boolean
    ) => ({
      imagesMaxWidth: _.window.width,
      baseFontStyle: {
        ...this.defaultBaseFontStyle,
        ...baseFontStyle
      },
      tagsStyles: {
        a: {
          paddingRight: _.web(2, _.sm),
          color: _.colorMain,
          textDecorationColor: _.colorMain,
          ...linkStyle
        }
      },
      classesStyles: {
        group_section: {
          textAlign: 'center'
        },
        sub: {
          color: _.colorSub
        }
      },
      textSelectable: true,

      // 渲染定义 tag 前回调
      renderers: {
        img: (attrs: any, _children: any, _css: any, passProps: any) =>
          img({
            key: passProps.key,
            src: attrs.src || '',
            alt: attrs.alt || '',
            autoSize: imagesMaxWidth,
            show: this.props.autoShowImage,
            onImageFallback: this.props.onImageFallback
          }),
        span: (attrs: any, children: any, _css: any, passProps: any) =>
          span({
            key: passProps.key,
            style: attrs.style || '',
            className: attrs.class || '',
            defaultBaseFontStyle: this.defaultBaseFontStyle,
            baseFontStyle: passProps.baseFontStyle,
            rawChildren: passProps.rawChildren,
            children
          }),
        q: (_attrs: any, children: any, _css: any, passProps: any) =>
          q({
            key: passProps.key,
            children
          }),
        ul: (_attrs: any, children: any, _css: any, passProps: any) =>
          ul({
            key: passProps.key,
            children
          }),
        li: (attrs: any, children: any, _css: any, passProps: any) =>
          li({
            key: passProps.key,
            style: attrs.style || '',
            className: attrs.class || '',
            children
          }),
        a: matchLink
          ? (attrs: any, children: any, _css: any, passProps: any) =>
              a({
                key: passProps.key,
                attrs,
                passProps,
                defaultBaseFontStyle: this.defaultBaseFontStyle,
                baseFontStyle,
                maxWidth: imagesMaxWidth,
                onPress: this.onLinkPress,
                children
              })
          : originA
      }
    })

    onLinkPress = (_evt: any, href: string) => {
      const { onLinkPress } = this.props
      if (typeof onLinkPress === 'function') {
        onLinkPress(href)
        return
      }

      open(href)
    }

    formatHTML = () => {
      const { html, baseFontStyle, matchLink } = this.props
      const { katakanaResult } = this.state

      try {
        const $ = cheerio(fixedHtml(html))
        let _html = html

        if (!WEB) {
          // 把小电视表情替换成客户端自定义的字体文字
          $('img[smileid]').replaceWith((_index: number, element: any) => {
            const $img = cheerio(element)
            const alt = $img.attr('alt') || ''
            if (alt) {
              const index = parseInt(alt.replace(REGS.bgm, ''))
              const emojis = BGM_MAP[index]
              if (emojis) {
                const { fontSize, lineHeight } = fixedBaseFontStyle(baseFontStyle)
                return `<span style="font-family:bgm;font-size:${
                  fontSize || this.defaultBaseFontStyle.fontSize
                }px;line-height:${
                  lineHeight || this.defaultBaseFontStyle.fontSize
                }px;user-select:all">${getBgmMiddleFrame(emojis)}</span>`
              }
              return alt
            }
            return $img.html()
          })

          // 暂时处理一下 BMO
          $('span.bmo').replaceWith((_index: number, element: any) => {
            const $span = cheerio(element)
            const code = $span.attr('data-code')
            if (code) {
              return `<span class="bmo" data-code="${code}">${code}</span>`
            }

            return $span.toString()
          })
        }

        _html = $.html()

        // 片假名后面加上小的英文
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
        logger.info(COMPONENT, 'formatHTML', error)
        return HTMLDecode(html)
      }
    }

    get defaultBaseFontStyle() {
      return {
        fontFamily: _.fontFamily,
        fontSize: 15 + _.fontSizeAdjust + (_.isPad ? PAD_FONT_ZISE_INCREASE : 0),
        // lineHeight: 24 + (_.isPad ? PAD_LINE_HEIGHT_INCREASE : 0),
        color: _.colorTitle
      }
    }

    render() {
      r(COMPONENT)

      if (this.state.error) return <Error />

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

      return (
        <ErrorBoundary style={style}>
          <Component id='component-render-html' style={style}>
            <HTML
              containerStyle={styles.container}
              html={this.formatHTML()}
              onLinkPress={this.onLinkPress}
              {...this.generateConfig(
                imagesMaxWidth,
                fixedBaseFontStyle(baseFontStyle),
                linkStyle,
                matchLink
              )}
              {...other}
            />
          </Component>
        </ErrorBoundary>
      )
    }
  }
)

export default RenderHtml
