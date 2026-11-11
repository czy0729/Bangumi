/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:16:39
 *
 * 解析打包说明图，保留资源编号与原始尺寸
 */
import { Image as RNImage } from 'react-native'

import type { GuideImageSlot, GuideThumb } from '../types'

/**
 * 把打包图片转换成图集条目
 *
 * @param images 说明图配置
 */
export function getGuideThumbs(images: readonly GuideImageSlot[]): GuideThumb[] {
  return images.flatMap<GuideThumb>(image => {
    try {
      const asset = RNImage.resolveAssetSource(image.source)
      if (!asset?.uri || !asset.width || !asset.height) return []

      return [
        {
          url: asset.uri,
          width: asset.width,
          height: asset.height
        }
      ]
    } catch {
      return []
    }
  })
}
