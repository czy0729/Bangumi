/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 17:34:06
 */
import React from 'react'
import { observer } from 'mobx-react'
import { rendererA, RNRenderHTML } from '@components/@'
import { _, rakuenStore, systemStore } from '@stores'
import { open } from '@utils'
import { logger, r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Component } from '../component'
import { ErrorBoundary } from '../error-boundary'
import { translateAll } from '../katakana/utils'
import Error from './error'
import { a, blockquote, div, img, li, q, span, ul } from './renderer'
import { fixedBaseFontStyle, formatHtml, splitHtmlByEmoji } from './utils'
import { COMPONENT, PAD_FONT_ZISE_INCREASE, REGS } from './ds'
import { styles } from './styles'

import type { GestureResponderEvent } from 'react-native'
import type { Renderer, Props as RenderHtmlProps } from './types'
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

    /** formatHtml / 分片 / 各片配置的结果缓存, deps 全等时直接复用 */
    private formatMemo = {
      deps: [] as unknown[],
      htmlValue: '',
      fragments: [] as string[],
      configs: [] as ReturnType<RenderHtmlComponent['generateConfig']>[]
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

    onLinkPress = (_evt: GestureResponderEvent, href: string) => {
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
      const isHasBigEmoji = REGS.emoji.test(formatHtml)
      const bigEmojiStyle = isHasBigEmoji
        ? { lineHeight: _[`fontSize${rakuenStore.setting.bigEmojiSize}`].lineHeight }
        : {}
      const flattenedBaseStyle: Record<string, string | number | undefined> = _.flatten([
        this.defaultBaseFontStyle,
        fixedBaseFontStyle(baseFontStyle),
        bigEmojiStyle
      ]) as Record<string, string | number | undefined>

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
          img: (attrs, _children, _css, passProps) =>
            img({
              key: passProps.key,
              src: attrs.src || '',
              alt: attrs.alt || '',
              autoSize: imagesMaxWidth,
              show: this.props.autoShowImage,
              onImageFallback: this.props.onImageFallback
            }),
          span: (attrs, children, _css, passProps) =>
            span({
              key: passProps.key,
              style: attrs.style || '',
              className: attrs.class || '',
              defaultBaseFontStyle: this.defaultBaseFontStyle,
              baseFontStyle: passProps.baseFontStyle,
              rawChildren: passProps.rawChildren,
              children
            }),
          q: (_attrs, children, _css, passProps) =>
            q({
              key: passProps.key,
              children
            }),
          blockquote: (_attrs, children, _css, passProps) =>
            blockquote({
              key: passProps.key,
              children
            }),
          ul: (_attrs, children, _css, passProps) =>
            ul({
              key: passProps.key,
              children
            }),
          li: (attrs, children, _css, passProps) =>
            li({
              key: passProps.key,
              style: attrs.style || '',
              className: attrs.class || '',
              children
            }),
          div: (attrs, children, _css, passProps) =>
            div({
              key: passProps.key,
              attrs,
              className: attrs.class || '',
              children,
              rawChildren: passProps.rawChildren
            }),
          a: matchLink
            ? (attrs, children, _css, passProps) =>
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
        } as Record<string, Renderer>
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
        onImageFallback,
        ...other
      } = this.props

      // 依赖值必须在缓存判断前无条件读取, 否则 mobx 追踪不到, 设置变化后不会重渲染
      const bigEmojiSize = rakuenStore.setting.bigEmojiSize
      const s2t = systemStore.setting.s2t
      const flattenedBaseStyle = _.flatten([this.defaultBaseFontStyle, baseFontStyle])

      const deps: unknown[] = [
        html,
        matchLink,
        splitLength,
        bigEmojiSize,
        s2t,
        JSON.stringify(flattenedBaseStyle),
        linkStyle,
        _.colorMain,
        _.window.width,
        autoShowImage,
        onImageFallback,
        imagesMaxWidth,
        katakanaResult
      ]
      const memo = this.formatMemo
      const hit =
        memo.deps.length === deps.length && memo.deps.every((dep, index) => dep === deps[index])

      if (!hit) {
        memo.deps = deps
        memo.htmlValue = formatHtml(html, flattenedBaseStyle, matchLink, katakanaResult) || ''
        memo.fragments = memo.htmlValue ? splitHtmlByEmoji(memo.htmlValue, splitLength) : []
        memo.configs = memo.fragments.map(item => this.generateConfig(item))
      }

      const { htmlValue, fragments, configs } = memo
      if (!htmlValue) return null

      return (
        <ErrorBoundary style={style}>
          <Component id='component-render-html' style={style}>
            {fragments.map((item, index) => (
              <RNRenderHTML
                key={String(index)}
                containerStyle={styles.container}
                html={item}
                onLinkPress={this.onLinkPress}
                {...configs[index]}
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
