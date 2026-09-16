/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 21:55:00
 *
 * 色场图 Web 入口 (与安卓实现保持一致; RNW 不支持 blurRadius, 实际表现为不模糊的小图)
 */
import { Image as RNImage } from 'react-native'
import { computeHeaders } from '@components/image/utils'
import { resolveImageUri } from '@utils/image'
import { BLUR_SCALE, getBlurSrc } from './ds'
import { styles } from './styles'

import type { BlurImageProps } from './types'

/** 色场图 (Web: RN Image + 100px 缩略图) */
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
