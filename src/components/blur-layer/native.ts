/*
 * @Author: czy0729
 * @Date: 2026-11-26 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-26 12:40:00
 *
 * 自研模糊视图的接入 (实现见 android/app/src/main/java/com/czy0729/bangumi/blur)
 *
 * 原生视图未注册时 (没重新编译原生包 / 非安卓环境) 返回 null, 由调用方降级;
 * 直接 requireNativeComponent 会在渲染期抛错并崩掉整个页面
 */
import { UIManager, requireNativeComponent } from 'react-native'
import { ANDROID } from '@constants'

import type { HostComponent } from 'react-native'
import type { BlurLayerProps, BlurRootViewProps } from './types'

/** 原生视图名 (与 BangumiBlurRootViewManager.REACT_CLASS 一致) */
export const NATIVE_BLUR_ROOT_NAME = 'BangumiBlurRootView'

/** 原生视图名 (与 BangumiBlurViewManager.REACT_CLASS 一致) */
export const NATIVE_BLUR_LAYER_NAME = 'BangumiBlurView'

function hasViewManager(name: string): boolean {
  if (!ANDROID) return false

  try {
    return !!UIManager.hasViewManagerConfig?.(name)
  } catch {
    return false
  }
}

/** 模糊根容器是否可用 */
export function isNativeBlurRootAvailable(): boolean {
  return hasViewManager(NATIVE_BLUR_ROOT_NAME)
}

/** 模糊层是否可用 */
export function isNativeBlurLayerAvailable(): boolean {
  return hasViewManager(NATIVE_BLUR_LAYER_NAME)
}

/** 模糊根容器与模糊层是否都可用 */
export function isNativeBlurAvailable(): boolean {
  return isNativeBlurRootAvailable() && isNativeBlurLayerAvailable()
}

/** 模糊根容器, 不可用时为 null */
export const NativeBlurRootView = isNativeBlurRootAvailable()
  ? (requireNativeComponent<BlurRootViewProps>(
      NATIVE_BLUR_ROOT_NAME
    ) as HostComponent<BlurRootViewProps>)
  : null

/** 模糊层, 不可用时为 null */
export const NativeBlurLayer = isNativeBlurLayerAvailable()
  ? (requireNativeComponent<BlurLayerProps>(
      NATIVE_BLUR_LAYER_NAME
    ) as HostComponent<BlurLayerProps>)
  : null
