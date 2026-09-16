/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 21:55:00
 *
 * 色场图安卓入口
 *
 * 安卓的图片引擎是 react-native-fast-image (Glide), 不支持 blurRadius,
 * 因此这里只能取 100px 缩略图并交给 RN 核心 Image 做模糊 (与改造前行为一致)
 *
 * 顶部羽化不在这里做, 由外层 MaskedView + 渐变遮罩完成 (见 index.tsx):
 * 卡片外层的 Squircle 在安卓已经改用原生 outline 裁剪 (原生视图), 不再占用 MaskedView,
 * 所以这层遮罩可以放心使用, 不存在嵌套
 */
import { Image as RNImage } from 'react-native'
import { computeHeaders } from '@components/image/utils'
import { resolveImageUri } from '@utils/image'
import { BLUR_SCALE, getBlurSrc } from './ds'
import { styles } from './styles'

import type { BlurImageProps } from './types'

/** 色场图 (安卓: RN 核心 Image + 100px 缩略图) */
export const BlurImage = ({ src, cdn, width, height, blurRadius, onError }: BlurImageProps) => (
  <RNImage
    style={[styles.blurImage, { width, height, transform: [{ scale: BLUR_SCALE }] }]}
    source={{ uri: resolveImageUri(getBlurSrc(src, cdn)), headers: computeHeaders(src) }}
    resizeMode='cover'
    blurRadius={blurRadius}
    fadeDuration={0}
    onError={onError}
  />
)

export default BlurImage
