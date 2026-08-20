/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 20:24:56
 */
import { VX_FLIP } from './ds'

import type { FlipDirection, ImageInfo, ImageSize, RenderImageProps } from './types'

/** 数值钳制 */
export const clamp = (value: number, min: number, max: number): number => {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

/** 当前页的横向基准位移 */
export const getPositionX = (index: number, width: number, isRTL: boolean): number =>
  width * index * (isRTL ? 1 : -1)

/** 图片适配视口 (等比缩放到不超出屏幕) */
export const fitImageSize = (
  width: number,
  height: number,
  viewportWidth: number,
  viewportHeight: number
) => {
  let w = width
  let h = height

  if (w > viewportWidth) {
    const widthPixel = viewportWidth / w
    w *= widthPixel
    h *= widthPixel
  }

  if (h > viewportHeight) {
    const heightPixel = viewportHeight / h
    w *= heightPixel
    h *= heightPixel
  }

  return { width: w, height: h }
}

/** 图片横向上能容忍的最大位移 (内容单位, transform 为 [scale, translate] 时视觉位移 = 内容位移 × scale) */
export const getHorizontalMax = (imageWidth: number, scale: number, cropWidth: number): number =>
  (imageWidth * scale - cropWidth) / (2 * scale)

/** 图片纵向上能容忍的最大位移 (内容单位) */
export const getVerticalMax = (imageHeight: number, scale: number, cropHeight: number): number =>
  (imageHeight * scale - cropHeight) / (2 * scale)

/** 手势结束后判定翻页方向 */
export const getFlipDirection = ({
  positionXNumber,
  standardPositionX,
  vx,
  isRTL,
  flipThreshold
}: {
  positionXNumber: number
  standardPositionX: number
  vx: number
  isRTL: boolean
  flipThreshold: number
}): FlipDirection => {
  const vxRTL = isRTL ? -vx : vx
  const isLeftMove = isRTL
    ? positionXNumber - standardPositionX < -flipThreshold
    : positionXNumber - standardPositionX > flipThreshold
  const isRightMove = isRTL
    ? positionXNumber - standardPositionX > flipThreshold
    : positionXNumber - standardPositionX < -flipThreshold

  if (vxRTL > VX_FLIP) return 'back'
  if (vxRTL < -VX_FLIP) return 'next'
  if (isLeftMove) return 'back'
  if (isRightMove) return 'next'
  return 'reset'
}

/** 初始化图片尺寸列表 */
export const createImageSizeList = (imageUrls: ImageInfo[]): ImageSize[] =>
  imageUrls.map(image => ({
    width: image.width || 0,
    height: image.height || 0,
    status: 'loading'
  }))

/** 不可变更新某张图的尺寸 (已非 loading 时跳过) */
export const updateImageSize = (
  sizes: ImageSize[],
  index: number,
  patch: Partial<ImageSize>
): ImageSize[] => {
  if (!sizes[index] || sizes[index].status !== 'loading') return sizes
  const next = sizes.slice()
  next[index] = { ...next[index], ...patch }
  return next
}

/** 构建 renderImage 参数 (不突变原 props) */
export const getRenderImageProps = (
  image: ImageInfo,
  width: number,
  height: number
): RenderImageProps => {
  const userProps = image.props || {}
  const source =
    typeof userProps.source === 'number'
      ? userProps.source
      : { uri: image.url, ...(userProps.source || {}) }

  return {
    source,
    style: { ...(userProps.style || {}), width, height }
  }
}
