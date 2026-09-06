/*
 * @Author: czy0729
 * @Date: 2026-09-06 19:14:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-06 19:14:12
 *
 * Image 组件入口解析锚点 (兜底)
 *
 * 平台入口各自自治:
 * - index.ios.tsx: iOS, 完全基于 expo-image (缓存 / 过渡动画由 expo-image 内建)
 * - index.android.tsx: 安卓, FastImage 引擎 (迁移前行为)
 * - index.web.tsx: Web, DOM / RN Web 引擎 (迁移前行为)
 *
 * Metro 按平台解析对应入口文件; TS 类型解析与非三平台环境回落到本文件 (对齐安卓实现)
 */
import { Image as RNImage } from 'react-native'

// 项目中若需要使用原本的 RN Image Component, 也需在这里引入以便统一管理
export { RNImage }

export { Image, default } from './index.android'
export type { Props as ImageProps } from './types'
