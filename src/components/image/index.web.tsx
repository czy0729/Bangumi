/*
 * @Author: czy0729
 * @Date: 2026-09-06 19:14:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 19:20:15
 *
 * Image 组件 Web 入口 (与迁移前 Web 行为保持一致)
 *
 * 渲染链路: remote 层 (reanimated fade) → 引擎 image/index.web.tsx (DOM img / RN Web Image)
 * Web 端缓存由浏览器 HTTP 缓存承担, props.cache / props.delay 默认关闭
 * iOS 入口 (index.ios.tsx) 已迁移 expo-image, 与本文件互不影响
 */
import { useMemo } from 'react'
import { Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { omit } from '@utils'
import { r } from '@utils/dev'
import { applyLainProxy } from '@utils/proxy'
import { EVENT } from '@constants'
import { TEXT_ONLY } from '@src/config'
import { devLog } from '../dev'
import { useImageAutoSize, useImageHeaders, useImageLoader } from './hooks'
import Local from './local'
import Placeholder from './placeholder'
import Remote from './remote'
import Skeleton from './skeleton'
import TextOnly from './text-only'
import ImageTouchable from './touchable'
import { computeImageStyles, imageViewerCallback, withDefaults } from './utils'
import { COMPONENT, OMIT_KEYS } from './ds'
import { memoStyles } from './styles'

// 项目中若需要使用原本的 RN Image Component, 也需在这里引入以便统一管理
export { RNImage }

import type { Props as ImageProps, State } from './types'
export type { ImageProps }

/** 图片组件, 支持本地/远端图片、缓存、自动宽高、错误重试 (Web: DOM / RN Web 引擎) */
export const Image = observer(function Image(baseProps: ImageProps) {
  r(COMPONENT)

  // React 18 起 FC 的 defaultProps 已废弃, 改为手动合并默认值;
  // 需逐键判断 undefined 而非对象展开: 上游(如 Cover)会显式传 size: undefined,
  // 展开写法会覆盖默认值导致图片丢失宽高 (与旧版 defaultProps 行为对齐)
  // Web 端 cache / delay 默认关闭 (与旧实现的 !WEB 一致), 缓存交给浏览器
  const props = withDefaults(baseProps, {
    autoSize: 0,
    border: false,
    borderWidth: _.hairlineWidth,
    cache: false,
    delay: false,
    event: EVENT,
    imageViewer: false,
    withoutFeedback: false,
    placeholder: true,
    shadow: false,
    size: 40,
    textOnly: TEXT_ONLY,
    priority: 'normal',
    skeleton: true
  })
  const {
    src,
    autoSize,
    autoHeight,
    placeholder,
    skeleton,
    skeletonType,
    textOnly,
    imageViewer,
    imageViewerSrc,
    event,
    onPress,
    onLongPress,
    errorToHide,
    fadeDuration
  } = props

  const headers = useImageHeaders(src, props.headers)
  const ctrl = useImageLoader(props, headers)

  useImageAutoSize({
    uri: ctrl.uri,
    src,
    autoSize,
    autoHeight,
    headers,
    onSize: ctrl.setSize,
    onError: ctrl.commitError
  })

  const styles = memoStyles()

  const state: State = {
    uri: ctrl.uri,
    width: ctrl.width,
    height: ctrl.height,
    loaded: ctrl.loaded,
    animFinished: ctrl.animFinished,
    error: ctrl.error
  }

  /** 合并计算最终样式 */
  const computedStyle = computeImageStyles(props, state, {
    borderRadius: systemStore.coverRadius || _.radiusXs,
    dev: systemStore.dev,
    fallbacked: ctrl.getFallbacked(),
    fileSize: ctrl.getSize(),
    styles,
    isDark: _.isDark,
    hairlineWidth: _.hairlineWidth,
    // 安卓 devEvent 可视化文字隐藏阴影的场景在 Web 同样生效 (旧实现的 !IOS 判定)
    devEventText: !!systemStore.devEvent.text
  })
  const { container: containerStyle, image: finalImageStyle } = computedStyle

  // omit 结果缓存, src 不变时复用 (与旧实现一致)
  const passProps = useMemo(
    () => omit(props, OMIT_KEYS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [src]
  )

  /** ImageViewer 回调 */
  const openViewer = useMemo(
    () =>
      imageViewerCallback({
        imageViewerSrc,
        uri: state.uri,
        src,
        headers,
        event
      }),
    [imageViewerSrc, state.uri, src, headers, event]
  )
  let onPressHandle = onPress

  // ImageViewer 模式: 点击打开大图
  if (imageViewer) {
    onPressHandle = openViewer
  }

  /** 开发模式 onLongPress: 输出调试信息 */
  const devLongPress = useMemo(() => {
    if (!systemStore.dev) return undefined

    return () => {
      devLog(JSON.stringify({ ...ctrl.getDebugInfo(), ...props, ...state }, null, 2))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemStore.dev])

  function renderImage() {
    if (textOnly) return <TextOnly style={finalImageStyle} />

    // Web 端不渲染错误图标 (与旧实现的 !WEB 判定一致), 直接走 uri 分支

    if (typeof src === 'string' || typeof src === 'undefined') {
      const { uri } = ctrl

      // 无 URI: 显示占位
      if (!uri) return <Placeholder style={finalImageStyle} />

      if (typeof uri === 'string') {
        // Web 端 autoSize 宽高未获取完前不阻塞渲染 (与旧实现的 !(IOS || WEB) 判定一致)

        const finalUri = applyLainProxy(uri)
        return (
          <Remote
            {...passProps}
            style={finalImageStyle}
            containerStyle={containerStyle}
            headers={headers}
            uri={finalUri}
            autoSize={autoSize}
            autoHeight={autoHeight}
            fadeDuration={fadeDuration}
            priority={props.priority}
            onError={ctrl.handleError}
            onLoadEnd={ctrl.handleLoadEnd}
          />
        )
      }
    }

    // 本地图片直接渲染
    return (
      <Local
        {...passProps}
        style={finalImageStyle}
        headers={props.headers}
        overrideHeaders={headers}
        src={src}
        onError={ctrl.handleError}
        onLoadEnd={ctrl.handleLoadEnd}
      />
    )
  }

  function renderSkeleton() {
    if (!skeleton) return null

    return (
      <Skeleton
        style={finalImageStyle}
        uri={state.uri}
        type={skeletonType}
        textOnly={textOnly}
        placeholder={placeholder}
        loaded={state.loaded}
      />
    )
  }

  if (ctrl.error && errorToHide) return null

  // 交互包装 (dev / onPress / onLongPress 时包 Touchable) 收敛在 touchable 子组件
  return (
    <ImageTouchable
      containerStyle={containerStyle}
      delay={props.delay}
      scale={props.scale}
      withoutFeedback={props.withoutFeedback}
      onPress={onPressHandle}
      onLongPress={devLongPress || onLongPress}
      skeleton={renderSkeleton()}
    >
      {renderImage()}
    </ImageTouchable>
  )
})

export default Image
