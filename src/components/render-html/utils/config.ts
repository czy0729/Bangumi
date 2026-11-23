/*
 * @Author: czy0729
 * @Date: 2026-11-24 11:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 11:30:00
 *
 * render-html 渲染配置: 基础样式、标签样式与自定义 renderer
 */
import { _, rakuenStore } from '@stores'
import { a as rendererA } from '../html-renderers'
import { a, blockquote, div, img, li, q, span, ul } from '../renderer'
import { fixedBaseFontStyle } from './font'

import type { GestureResponderEvent } from 'react-native'
import type { TextStyle } from '@types'
import type { Renderer } from '../types'

export type GenerateConfigOptions = {
  /** 是否命中大表情 */
  isHasBigEmoji: boolean

  /** 默认基础字体样式 */
  defaultBaseFontStyle: Record<string, string | number>

  /** 调用方传入的基础字体样式 */
  baseFontStyle: TextStyle

  /** 链接字体样式 */
  linkStyle: TextStyle

  /** 内嵌图片最大宽度 */
  imagesMaxWidth?: number

  /** 是否使用 a 渲染内嵌链接 */
  matchLink?: boolean

  /** 是否自动加载显示图片 */
  autoShowImage?: boolean

  /** 图片降级回调 */
  onImageFallback?: (src?: string) => void

  /** 内嵌链接点击 */
  onLinkPress: (evt: GestureResponderEvent, href: string) => void
}

/** 生成 render-html 配置, 只区分是否命中大表情 */
export function generateConfig({
  isHasBigEmoji,
  defaultBaseFontStyle,
  baseFontStyle,
  linkStyle,
  imagesMaxWidth,
  matchLink,
  autoShowImage,
  onImageFallback,
  onLinkPress
}: GenerateConfigOptions) {
  const bigEmojiStyle = isHasBigEmoji
    ? { lineHeight: _[`fontSize${rakuenStore.setting.bigEmojiSize}`].lineHeight }
    : {}
  const flattenedBaseStyle: Record<string, string | number | undefined> = _.flatten([
    defaultBaseFontStyle,
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
          show: autoShowImage,
          onImageFallback
        }),
      span: (attrs, children, _css, passProps) =>
        span({
          key: passProps.key,
          style: attrs.style || '',
          className: attrs.class || '',
          defaultBaseFontStyle,
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
              defaultBaseFontStyle,
              baseFontStyle: flattenedBaseStyle,
              maxWidth: imagesMaxWidth,
              onPress: onLinkPress,
              children
            })
        : rendererA
    } as Record<string, Renderer>
  }
}
