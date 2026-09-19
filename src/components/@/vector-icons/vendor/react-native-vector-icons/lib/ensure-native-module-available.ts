/*
 * @Author: czy0729
 * @Date: 2026-09-19 07:24:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 08:01:49
 */
import { NativeModules } from 'react-native'

import type { ProcessedColorValue } from 'react-native'

/** RNVectorIcons 原生模块契约 (仅直渲位图路径使用) */
export type NativeVectorIconsModule = {
  /** 字体渲染 glyph 为位图, 返回本地图片路径 */
  getImageForFont: (
    fontFamily: string,
    glyph: string,
    fontSize: number,
    color: ProcessedColorValue | null | undefined
  ) => Promise<string>
  getImageForFontSync: (
    fontFamily: string,
    glyph: string,
    fontSize: number,
    color: ProcessedColorValue | null | undefined
  ) => string
  loadFontWithFileName: (...args: string[]) => Promise<void>
}

export const NativeIconAPI = (NativeModules.RNVectorIconsManager ||
  NativeModules.RNVectorIconsModule) as NativeVectorIconsModule | undefined

/** 直渲位图 (getImageSource) 依赖 RNVectorIcons 原生模块, 缺失时尽早报错 */
export default function ensureNativeModuleAvailable(): NativeVectorIconsModule {
  if (!NativeIconAPI) {
    throw new Error(
      'The native RNVectorIcons API is not available, did you properly integrate the module? Please verify your autolinking setup and recompile.'
    )
  }
  return NativeIconAPI
}
