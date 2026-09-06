/*
 * @Author: czy0729
 * @Date: 2026-09-06 19:14:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 20:19:17
 *
 * Image 组件 iOS 入口 (完全基于 expo-image)
 *
 * expo-image 已内建、直接使用的能力 (旧实现对应的自研逻辑均已移除):
 * - 磁盘 + 内存缓存 (cachePolicy): 替代 image-cache-manager 的下载队列 / sha1 落盘 / LRU 清理 /
 *   memoLocal 命中表 / 下载超时竞速, URI 恒为远端地址
 * - 加载过渡动画 (transition): 替代 remote 层的 reanimated fade
 * - priority / recyclingKey / source.headers: 对应旧的 priority / 列表回收 / 防盗链请求头
 *
 * expo-image 不覆盖、复用 shared 的能力:
 * - 失败链路 (magma CDN 探测 / fallbackSrc 回退 / 指数退避重试): hooks.useImageLoader
 * - 占位 / 骨架屏 / 错误 UI: placeholder / skeleton / error
 * - 圆角 / 边框 / 阴影 / 占位底色样式计算: utils.computeImageStyles
 * - 调试壳 + 触摸 + ImageViewer: touchable
 */
import { useCallback, useMemo } from 'react'
import { Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { Image as ExpoImage } from 'expo-image'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { applyLainProxy } from '@utils/proxy'
import { DOGE_CDN_IMG_DEFAULT, EVENT } from '@constants'
import { IOS_IPA, TEXT_ONLY } from '@src/config'
import { devLog } from '../dev'
import Error from './error'
import { useImageAutoSize, useImageHeaders, useImageLoader } from './hooks'
import Placeholder from './placeholder'
import Skeleton from './skeleton'
import TextOnly from './text-only'
import ImageTouchable from './touchable'
import { computeImageStyles, imageViewerCallback, withDefaults } from './utils'
import { COMPONENT, IMAGE_FADE_DURATION } from './ds'
import { memoStyles } from './styles'

// 项目中若需要使用原本的 RN Image Component, 也需在这里引入以便统一管理
export { RNImage }

import type { ImageErrorEvent } from 'react-native'
import type { ImageSource as ExpoImageSource } from 'expo-image'
import type { Props as ImageProps, State } from './types'
export type { ImageProps }

/** RN Image resizeMode → expo-image contentFit 映射 (两端默认值一致, 均为 cover) */
const CONTENT_FIT: Record<string, 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'> = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'fill',
  center: 'scale-down',
  // expo-image 无平铺模式, 退化 cover
  repeat: 'cover'
}

/** 已播放过渐出的图片地址, 同一地址仅首次显示过渡 (对齐安卓 remote 层的 memo 行为) */
const shownMemo = new Map<string, boolean>()
shownMemo.set(DOGE_CDN_IMG_DEFAULT, true)

/** 图片组件, 支持本地/远端图片、缓存、自动宽高、错误重试 (iOS: expo-image 引擎) */
export const Image = observer(function Image(baseProps: ImageProps) {
  r(COMPONENT)

  // React 18 起 FC 的 defaultProps 已废弃, 改为手动合并默认值;
  // 需逐键判断 undefined 而非对象展开: 上游(如 Cover)会显式传 size: undefined,
  // 展开写法会覆盖默认值导致图片丢失宽高 (与旧版 defaultProps 行为对齐)
  // iOS 原生环境 cache / delay 恒为 true (旧实现的 !WEB 在原生即 true)
  const props = withDefaults(baseProps, {
    autoSize: 0,
    border: false,
    borderWidth: _.hairlineWidth,
    cache: true,
    delay: true,
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
    size,
    width,
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
  // 稳定引用解构, 供下方 useCallback 依赖使用
  const { handleLoadEnd: onLoaderLoadEnd, handleError: onLoaderError } = ctrl

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
    // 安卓 devEvent 可视化文字开启时隐藏阴影的场景, iOS 不涉及
    devEventText: false
  })
  const { container: containerStyle, image: finalImageStyle } = computedStyle

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

  /** 渐出过渡: 由 expo-image transition 接管 (替代 remote 层 reanimated fade); 本地图片无地址 key, 不播过渡 (对齐安卓/Web) */
  const uriKey = typeof src === 'string' ? src : ''
  const transition =
    systemStore.setting.imageFadeIn && fadeDuration !== 0 && uriKey && !shownMemo.has(uriKey)
      ? IMAGE_FADE_DURATION
      : 0

  const handleLoadEnd = useCallback(() => {
    onLoaderLoadEnd()

    // 过渡播放完后记录, 避免同一地址再次播放 (对齐 remote 层行为)
    if (transition && uriKey) {
      setTimeout(() => shownMemo.set(uriKey, true), IMAGE_FADE_DURATION + 100)
    }
  }, [onLoaderLoadEnd, transition, uriKey])

  /** expo-image 错误事件适配: ImageErrorEventData.error → useImageLoader 的 RN 事件结构 */
  const handleError = useCallback(
    ({ error }: { error?: string }) => {
      onLoaderError({ nativeEvent: { error: error || '' } } as ImageErrorEvent)
    },
    [onLoaderError]
  )

  /** resizeMode 透传转 contentFit, 未传时用两端一致的默认值 cover */
  const contentFit =
    (typeof props.resizeMode === 'string' && CONTENT_FIT[props.resizeMode]) || 'cover'

  /** RN Image 透传 props 中 expo-image 仍支持的着色, 显式白名单转发 */
  const tintColor = props.tintColor

  function renderImage() {
    if (textOnly) return <TextOnly style={finalImageStyle} />

    // 加载失败: 显示错误图标
    if (ctrl.error) {
      return <Error style={finalImageStyle} size={width || size} />
    }

    if (typeof src === 'string' || typeof src === 'undefined') {
      const { uri } = ctrl

      // 无 URI: 显示占位
      if (!uri) return <Placeholder style={finalImageStyle} />

      if (typeof uri === 'string') {
        const finalUri = applyLainProxy(uri)
        return (
          <ExpoImage
            style={finalImageStyle}
            // 缓存由 expo-image cachePolicy 内建, 无需 RN Image 的 cache / fadeDuration 等 props
            source={{
              uri: finalUri,
              headers: {
                ...headers,
                'Cache-Control': 'max-age=31536000'
              }
            }}
            contentFit={contentFit}
            // expo-image priority 取值 ('low' | 'normal' | 'high') 与旧 prop 一致
            priority={props.priority}
            tintColor={tintColor}
            transition={transition}
            // 列表复用时按 src 回收, 降低大列表内存峰值
            recyclingKey={uriKey || undefined}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
          />
        )
      }
    }

    // 本地图片 (require 的 number 或 ImageSource 对象): expo-image 原生支持, 直接渲染
    return (
      <ExpoImage
        style={finalImageStyle}
        source={src as ExpoImageSource | number}
        contentFit={contentFit}
        tintColor={tintColor}
        transition={transition}
        recyclingKey={uriKey || undefined}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
    )
  }

  function renderSkeleton() {
    // 与旧实现一致: IPA 上不显示骨架屏动画
    if (IOS_IPA || !skeleton) return null

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
