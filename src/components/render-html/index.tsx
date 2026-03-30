/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-30 01:00:15
 */
import React from 'react'
import { observer } from 'mobx-react'
import { rendererA, RNRenderHTML } from '@components/@'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { logger, r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Component } from '../component'
import { ErrorBoundary } from '../error-boundary'
import { translateAll } from '../katakana/utils'
import Error from './error'
import { a, img, li, q, span, ul } from './renderer'
import { fixedBaseFontStyle, formatHtml, splitHtmlByEmoji } from './utils'
import { COMPONENT, PAD_FONT_ZISE_INCREASE } from './ds'
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
      splitLength: 12,
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

    onLinkPress = (_evt: any, href: string) => {
      const { onLinkPress } = this.props
      if (typeof onLinkPress === 'function') {
        onLinkPress(href)
        return
      }

      open(href)
    }

    get defaultBaseFontStyle() {
      return {
        fontFamily: _.fontFamily,
        fontSize: 15 + _.fontSizeAdjust + (_.isPad ? PAD_FONT_ZISE_INCREASE : 0),
        color: _.colorTitle
      }
    }

    /** 生成 render-html 配置 */
    generateConfig = (formatHtml: string) => {
      const { imagesMaxWidth, baseFontStyle, linkStyle, matchLink } = this.props

      // 命中表情片段
      const isHasBigEmoji = /font-family:bgm[^>]*?>(?:6|7|8|9)\d{2}<\/span>/i.test(formatHtml)
      const bigEmojiStyle = isHasBigEmoji ? { lineHeight: _.fontSize48.lineHeight } : {}
      const flattenedBaseStyle = _.flatten([
        this.defaultBaseFontStyle,
        fixedBaseFontStyle(baseFontStyle),
        bigEmojiStyle
      ])

      return {
        imagesMaxWidth: _.window.width,
        baseFontStyle: flattenedBaseStyle,
        tagsStyles: {
          a: _.flatten([
            {
              paddingRight: _.web(2, _.sm),
              color: _.colorMain,
              textDecorationColor: _.colorMain
            },
            linkStyle,
            bigEmojiStyle
          ])
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
                  baseFontStyle: flattenedBaseStyle,
                  maxWidth: imagesMaxWidth,
                  onPress: this.onLinkPress,
                  children
                })
            : rendererA
        }
      }
    }

    render() {
      r(COMPONENT)

      const { error, katakanaResult } = this.state
      if (error) return <Error />

      const {
        style,
        baseFontStyle,
        linkStyle,
        imagesMaxWidth,
        html,
        autoShowImage,
        matchLink,
        splitLength,
        onLinkPress,
        ...other
      } = this.props
      const htmlValue = formatHtml(
        html,
        _.flatten([this.defaultBaseFontStyle, baseFontStyle]),
        matchLink,
        katakanaResult
      )
      if (!htmlValue) return null

      return (
        <ErrorBoundary style={style}>
          <Component id='component-render-html' style={style}>
            {splitHtmlByEmoji(htmlValue, splitLength).map((item, index) => (
              <RNRenderHTML
                key={String(index)}
                containerStyle={styles.container}
                html={item}
                onLinkPress={this.onLinkPress}
                {...this.generateConfig(item)}
                {...other}
              />
            ))}
          </Component>
        </ErrorBoundary>
      )
    }
  }
)

export default RenderHtml
