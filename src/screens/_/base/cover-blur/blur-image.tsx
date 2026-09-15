/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:54:25
 *
 * 色场图组件入口解析锚点 (兜底)
 *
 * 平台入口各自自治:
 * - blur-image.ios.tsx: iOS, 复用封面同一张图走项目 Image (expo-image + blurRadius), 缓存同源
 * - blur-image.android.tsx: 安卓, RN 核心 Image + 100px 缩略图 (FastImage 不支持模糊)
 * - blur-image.web.tsx: Web, 同安卓实现
 *
 * Metro 按平台解析对应入口文件; TS 类型解析与非三平台环境回落到本文件 (对齐安卓实现)
 */
export { BlurImage, default } from './blur-image.android'
export type { BlurImageProps } from './types'
