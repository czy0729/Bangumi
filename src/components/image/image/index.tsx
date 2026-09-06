/*
 * @Author: czy0729
 * @Date: 2026-09-06 19:16:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-06 19:16:47
 *
 * iOS 图片引擎: expo-image
 *
 * expo-image 已内建磁盘 + 内存缓存 (cachePolicy)、加载过渡 (transition)、优先级、
 * 列表回收 (recyclingKey) 等能力, 替代 react-native Image + 自研 image-cache-manager 方案;
 * 本文件仅作 re-export, 渲染入口见 ../index.ios.tsx
 */
import { Image as ExpoImage } from 'expo-image'

import type { Image as RNImage } from 'react-native'

// 本文件是引擎的平台解析锚点: iOS bundle 渲染 expo-image, 安卓解析 image/index.android.tsx (FastImage),
// Web 解析 image/index.web.tsx (RN Image)。默认导出的消费方 (local / remote) 只运行在安卓与 Web,
// 均以 RN Image 风格 props 调用, 故类型对齐 RN Image (iOS 入口直接使用 expo-image, 不经过本导出)
export default ExpoImage as unknown as typeof RNImage

/** 清除图片缓存: expo-image 原生提供内存 + 磁盘两级清理 (设置页"清除图片缓存"入口使用) */
export async function clearCache() {
  try {
    await ExpoImage.clearMemoryCache()
    await ExpoImage.clearDiskCache()
    return true
  } catch {}

  return false
}
