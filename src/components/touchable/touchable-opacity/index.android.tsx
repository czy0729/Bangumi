/*
 * @Author: czy0729
 * @Date: 2026-09-13 16:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 17:40:00
 */
import React, { useCallback, useRef } from 'react'
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { ACTIVE_OPACITY } from '../ds'

import type { GestureResponderEvent, View as ViewInstance } from 'react-native'
import type { Props } from './types'

/**
 * 安卓端底座: 只替换"按下变暗"这一段实现, 事件语义仍由 TouchableWithoutFeedback (Pressability) 承载
 *
 *  - 按下/抬手都用 setNativeProps 直接写原生透明度
 *    - 不经过 React 渲染, 也没有 JS 驱动的逐帧动画
 *    - 命令只是一次 UIManager 入队, 入队后在 UI 线程被应用, 不再受 JS 阻塞影响;
 *      但入队本身发生在 onPressIn/onPressOut (JS 事件) 处理时, JS 繁忙时入队时机同样延迟
 *  - 已知约束: setNativeProps 在新架构 (Fabric) 上不受支持, 当前 Paper 架构有效,
 *    升级 RN / 开启 newArch 时此底座需要重做
 *  - 反馈为即时切换, 抬手立即恢复, 不存在"等 onPress 执行完才恢复"
 *  - 不引入 react-native-gesture-handler: 其安卓端从 RootView 层拦截触摸流, 手势状态未正常终结时
 *    (切后台最易复现) 会持续吞掉事件, 使 RN 响应者收不到触摸 -> 全 app 点击失灵
 *  - useRN={true} 走 RN 原生 TouchableOpacity, 用于真机对照与回退
 */
function TouchableOpacity({
  useRN,
  style,
  activeOpacity = ACTIVE_OPACITY,
  onPressIn,
  onPressOut,
  children,
  ...other
}: Props) {
  /** 承载样式与透明度的原生节点, collapsable=false 保证它不被拍平, ref 才有意义 */
  const viewRef = useRef<ViewInstance>(null)

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      viewRef.current?.setNativeProps({ style: { opacity: activeOpacity } })
      if (onPressIn) onPressIn(event)
    },
    [activeOpacity, onPressIn]
  )

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      viewRef.current?.setNativeProps({ style: { opacity: 1 } })
      if (onPressOut) onPressOut(event)
    },
    [onPressOut]
  )

  if (useRN) {
    return (
      <RNTouchableOpacity
        style={style}
        activeOpacity={activeOpacity}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        {...other}
      >
        {children}
      </RNTouchableOpacity>
    )
  }

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} {...other}>
      <View ref={viewRef} style={style} collapsable={false}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default React.memo(TouchableOpacity)
