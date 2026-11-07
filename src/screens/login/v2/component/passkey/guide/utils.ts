/*
 * @Date: 2026-11-01
 *
 * 解析本地说明图并保留打包资源与尺寸, 不将空地址交给图集
 */
import { Image as RNImage } from 'react-native'

import type { GuideImageSlot, GuideThumb } from './types'

export function getGuideThumbs(images: readonly GuideImageSlot[]): GuideThumb[] {
  return images.flatMap<GuideThumb>(image => {
    if (image.source !== undefined) {
      try {
        const asset = RNImage.resolveAssetSource(image.source)
        if (!asset?.uri || !asset.width || !asset.height) return []
        return [
          {
            url: asset.uri,
            width: asset.width,
            height: asset.height,
            props: { source: image.source }
          }
        ]
      } catch {
        return []
      }
    }
    const url = image.url?.trim()
    return url ? [{ url }] : []
  })
}
