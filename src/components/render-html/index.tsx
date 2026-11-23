/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 11:30:00
 */
import React, { useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import { _, rakuenStore, systemStore } from '@stores'
import { open } from '@utils'
import { logger, r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Component } from '../component'
import { ErrorBoundary } from '../error-boundary'
import Error from './error'
import { useKatakana } from './hooks'
import RNRenderHTML from './html'
import { formatHtml, getDefaultBaseFontStyle, splitHtmlByEmoji } from './utils'
import { generateConfig } from './utils/config'
import { COMPONENT, REGS } from './ds'
import { styles } from './styles'

import type { GestureResponderEvent } from 'react-native'
import type { Props as RenderHtmlProps } from './types'
export type { RenderHtmlProps }

const TAG = COMPONENT

type FormatMemo = {
  deps: unknown[]
  htmlValue: string
  fragments: string[]
  configs: ReturnType<typeof generateConfig>[]
}

/** 渲染异常兜底, 函数组件无法 catch 子树错误 */
class RenderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = {
    error: null
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    logger.error(TAG, 'componentDidCatch', error)
  }

  render() {
    return this.state.error ? <Error /> : this.props.children
  }
}

/**
 * react-native 中渲染 html
 * @doc https://github.com/archriss/react-native-render-html
 */
const RenderHtmlContent = observer(
  ({
    style,
    baseFontStyle = {},
    linkStyle = {},
    imagesMaxWidth,
    html = '',
    autoShowImage = false,
    matchLink = false,
    splitLength = 12,
    onLinkPress = FROZEN_FN,
    onImageFallback = FROZEN_FN,
    katakana,
    ...other
  }: RenderHtmlProps) => {
    r(COMPONENT)

    const katakanaResult = useKatakana(html, katakana)
    const maxImagesWidth = imagesMaxWidth === undefined ? _.window.width - 2 * _.wind : imagesMaxWidth

    /** 用 ref 持有最新回调, 回调引用变化不重建配置 */
    const onLinkPressRef = useRef(onLinkPress)
    onLinkPressRef.current = onLinkPress
    const onImageFallbackRef = useRef(onImageFallback)
    onImageFallbackRef.current = onImageFallback

    const handleLinkPress = useCallback((_evt: GestureResponderEvent, href: string) => {
      const handler = onLinkPressRef.current
      if (typeof handler === 'function') {
        handler(href)
        return
      }

      open(href)
    }, [])

    const handleImageFallback = useCallback((src?: string) => {
      onImageFallbackRef.current?.(src)
    }, [])

    // 依赖值必须在缓存判断前无条件读取, 否则 mobx 追踪不到, 设置变化后不会重渲染
    const defaultBaseFontStyle = getDefaultBaseFontStyle()
    const bigEmojiSize = rakuenStore.setting.bigEmojiSize
    const s2t = systemStore.setting.s2t
    const flattenedBaseStyle = _.flatten([defaultBaseFontStyle, baseFontStyle])

    // renderer 闭包读到的 prop 都参与 deps, 回调经 ref 读取不参与
    const deps: unknown[] = [
      html,
      matchLink,
      splitLength,
      bigEmojiSize,
      s2t,
      // baseFontStyle 可覆盖默认值, 与默认字体样式合并序列化一次
      JSON.stringify([defaultBaseFontStyle, baseFontStyle]),
      JSON.stringify(linkStyle),
      _.colorMain,
      // classesStyles.sub 的颜色
      _.colorSub,
      _.window.width,
      autoShowImage,
      maxImagesWidth,
      katakanaResult
    ]
    const memo = useRef<FormatMemo>({
      deps: [],
      htmlValue: '',
      fragments: [],
      configs: []
    })
    const { current } = memo
    const hit =
      current.deps.length === deps.length && current.deps.every((dep, index) => dep === deps[index])

    if (!hit) {
      current.deps = deps
      current.htmlValue = formatHtml(html, flattenedBaseStyle, matchLink, katakanaResult) || ''
      current.fragments = current.htmlValue ? splitHtmlByEmoji(current.htmlValue, splitLength) : []
      // 配置只随「是否命中大表情」变化: 同组片段共享同一份, 未命中时的分配从 N 份降到 ≤2 份
      const configsByEmoji = new Map<boolean, ReturnType<typeof generateConfig>>()
      current.configs = current.fragments.map(item => {
        const isHasBigEmoji = REGS.emoji.test(item)
        let config = configsByEmoji.get(isHasBigEmoji)
        if (!config) {
          config = generateConfig({
            isHasBigEmoji,
            defaultBaseFontStyle,
            baseFontStyle,
            linkStyle,
            imagesMaxWidth: maxImagesWidth,
            matchLink,
            autoShowImage,
            onImageFallback: handleImageFallback,
            onLinkPress: handleLinkPress
          })
          configsByEmoji.set(isHasBigEmoji, config)
        }

        return config
      })
    }

    const { htmlValue, fragments, configs } = current
    if (!htmlValue) return null

    return (
      <ErrorBoundary style={style}>
        <Component id='component-render-html' style={style}>
          {fragments.map((item, index) => (
            <RNRenderHTML
              key={String(index)}
              containerStyle={styles.container}
              html={item}
              onLinkPress={handleLinkPress}
              {...configs[index]}
              {...other}
            />
          ))}
        </Component>
      </ErrorBoundary>
    )
  }
)

export const RenderHtml = (props: RenderHtmlProps) => (
  <RenderErrorBoundary>
    <RenderHtmlContent {...props} />
  </RenderErrorBoundary>
)

export default RenderHtml
