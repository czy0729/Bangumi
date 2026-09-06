/*
 * @Author: czy0729
 * @Date: 2026-09-06 19:16:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 19:20:38
 *
 * Image 交互容器子组件
 * 封装 Component 调试壳 + Touchable 触摸包装 + 骨架屏插槽,
 * 由三平台入口共用: index.ios.tsx / index.android.tsx / index.web.tsx
 */
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { Component } from '../../component'
import { Touchable } from '../../touchable'

import type { Props } from './types'

/** 直接读取 systemStore.dev (dev 模式无交互也包 Touchable 供长按调试), 按规范用 observer */
function ImageTouchable({
  containerStyle,
  delay,
  scale,
  withoutFeedback,
  onPress,
  onLongPress,
  skeleton,
  children
}: Props) {
  // 非交互渲染: 无触摸包装, 保留调试壳与骨架屏
  if (!systemStore.dev && !onPress && !onLongPress) {
    return (
      <Component id='component-image' style={containerStyle}>
        {children}
        {skeleton}
      </Component>
    )
  }

  return (
    <Component id='component-image' style={containerStyle}>
      <Touchable
        delay={delay}
        scale={scale}
        withoutFeedback={withoutFeedback}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {children}
      </Touchable>
      {skeleton}
    </Component>
  )
}

export default observer(ImageTouchable)
