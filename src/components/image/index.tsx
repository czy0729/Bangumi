/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 03:13:22
 */
import React, { useMemo } from 'react'
import { Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { omit } from '@utils'
import { r } from '@utils/dev'
import { applyLainProxy } from '@utils/proxy'
import { EVENT, IOS, WEB } from '@constants'
import { IOS_IPA, TEXT_ONLY } from '@src/config'
import { Component } from '../component'
import { devLog } from '../dev'
import { Touchable } from '../touchable'
import Error from './error'
import { useImageAutoSize, useImageHeaders, useImageLoader } from './hooks'
import Local from './local'
import Placeholder from './placeholder'
import Remote from './remote'
import Skeleton from './skeleton'
import TextOnly from './text-only'
import { computeImageStyles, imageViewerCallback, withDefaults } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

// 项目中若需要使用原本的 RN Image Component，也需在这里引入以便统一管理
export { RNImage }

import type { TouchableHandlePress } from '../touchable/types'
import type { Props as ImageProps, State } from './types'
export type { ImageProps }

/** 透传给底层 Image 的 props 黑名单 */
const OMIT_KEYS: (keyof ImageProps)[] = [
  'style',
  'imageStyle',
  'src',
  'size',
  'height',
  'border',
  'borderWidth',
  'radius',
  'shadow',
  'placeholder',
  'autoSize',
  'autoHeight',
  'imageViewer',
  'imageViewerSrc',
  'withoutFeedback',
  'headers',
  'event',
  'delay',
  'scale',
  'cache',
  'fadeDuration',
  'errorToHide',
  'skeleton',
  'skeletonType',
  'textOnly',
  'priority',
  'onPress',
  'onLongPress',
  'onError'
]

/** 图片组件，支持本地/远端图片、缓存、自动宽高、错误重试 */
export const Image = observer(function Image(baseProps: ImageProps) {
  r(COMPONENT)

  // React 18 起 FC 的 defaultProps 已废弃, 改为手动合并默认值;
  // 需逐键判断 undefined 而非对象展开: 上游(如 Cover)会显式传 size: undefined,
  // 展开写法会覆盖默认值导致图片丢失宽高 (与旧版 defaultProps 行为对齐)
  const props = withDefaults(baseProps, {
    autoSize: 0,
    border: false,
    borderWidth: _.hairlineWidth,
    cache: !WEB,
    delay: !WEB,
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
    devEventText: !IOS && !!systemStore.devEvent.text
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

  // ImageViewer 模式：点击打开大图
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

    // 加载失败：显示错误图标
    if (ctrl.error && !WEB) {
      return <Error style={finalImageStyle} size={width || size} />
    }

    if (typeof src === 'string' || typeof src === 'undefined') {
      const { uri } = ctrl

      // 无 URI：显示占位
      if (!uri) return <Placeholder style={finalImageStyle} />

      if (typeof uri === 'string') {
        // 安卓 autoSize 场景：宽高未获取完前显示占位
        if (!(IOS || WEB) && ((autoSize && !ctrl.width) || (autoHeight && !ctrl.height))) {
          return <Placeholder style={finalImageStyle} />
        }

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

  function renderTouchableImage(onPressFn?: TouchableHandlePress) {
    return (
      <Component id='component-image' style={containerStyle}>
        <Touchable
          delay={props.delay}
          scale={props.scale}
          withoutFeedback={props.withoutFeedback}
          onPress={onPressFn}
          onLongPress={devLongPress || onLongPress}
        >
          {renderImage()}
        </Touchable>
        {renderSkeleton()}
      </Component>
    )
  }

  if (ctrl.error && errorToHide) return null

  // 有交互事件：包裹 Touchable
  if (systemStore.dev || onPressHandle || onLongPress) {
    return renderTouchableImage(onPressHandle)
  }

  return (
    <Component id='component-image' style={containerStyle}>
      {renderImage()}
      {renderSkeleton()}
    </Component>
  )
})

export default Image
