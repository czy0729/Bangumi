/*
 * @Author: czy0729
 * @Date: 2026-09-15 21:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 23:50:00
 *
 * 安卓原生超椭圆裁剪视图的接入 (实现见 android/app/src/main/java/com/czy0729/bangumi/squircle)
 *
 * 原生视图未注册时 (没重新编译原生包 / 非安卓环境) 返回 null, 由调用方降级:
 * 直接用 requireNativeComponent 的话, 未注册时会在渲染期抛错并崩掉整个页面
 */
import { UIManager, requireNativeComponent } from 'react-native'
import { ANDROID } from '@constants'

import type { HostComponent } from 'react-native'
import type { NativeSquircleProps } from './types'

/** 原生视图名 (与 SquircleViewManager.REACT_CLASS 一致) */
export const NATIVE_SQUIRCLE_NAME = 'BangumiSquircle'

/**
 * 原生超椭圆裁剪视图是否可用
 *  - 先判平台: 只有安卓有这条原生实现, iOS / Web 不该去碰 UIManager
 *  - 用 hasViewManagerConfig 而不是 getViewManagerConfig: 后者在 iOS 新架构 (bridgeless) 下
 *    会先 console.error 一句 "getViewManagerConfig is not available" 再返回 null, try/catch 抓不住,
 *    dev 下每次启动/热重载 LogBox 都会常驻这条错误; hasViewManagerConfig 两端都走注册表, 零噪音
 * */
export function isNativeSquircleAvailable(): boolean {
  if (!ANDROID) return false

  try {
    return !!UIManager.hasViewManagerConfig?.(NATIVE_SQUIRCLE_NAME)
  } catch {
    return false
  }
}

/** 原生超椭圆裁剪容器, 不可用时为 null */
export const NativeSquircle = isNativeSquircleAvailable()
  ? (requireNativeComponent<NativeSquircleProps>(
      NATIVE_SQUIRCLE_NAME
    ) as HostComponent<NativeSquircleProps>)
  : null
