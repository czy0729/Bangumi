/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 00:00:00
 */
import type { CoverProps } from '@components'

export type Props = {
  /** 封面原始地址 (组件内部自行取 CDN / 请求头) */
  src: CoverProps['src']

  /** 是否按 CDN 规则取缩略图 */
  cdn?: boolean

  /** 卡片宽度 (与 Cover 一致) */
  width: number

  /** 卡片高度 (与 Cover 一致) */
  height: number

  /** 底部模糊带高度, 默认按卡片高度比例 ds.BLUR_HEIGHT_RATIO (过大会整卡糊掉) */
  blurHeight?: number

  /** 文字遮罩 / 无图兜底渐变高度, 默认与模糊带一致 (需要沿用历史观感的卡片可自行传值) */
  scrimHeight?: number

  /** 模糊半径, 默认取 ds.BLUR_RADIUS */
  blurRadius?: number
}

/** 平台化色场图组件入参 */
export type BlurImageProps = {
  /** 封面原始地址 */
  src: Props['src']

  /** 是否按 CDN 规则取缩略图 */
  cdn?: boolean

  /** 卡片宽度 */
  width: number

  /** 卡片高度 */
  height: number

  /** 模糊半径 */
  blurRadius: number

  /** 加载失败回调 */
  onError: () => void
}

/** 三层高度计算结果 (单位与卡片一致) */
export type CoverBlurLayout = {
  /** 色场高度 */
  blur: number

  /** 文字黑罩 / 无图兜底渐变高度 */
  scrim: number

  /** 氛围层高度 */
  ambient: number
}

/** 高度计算入参 (比例可注入, 便于单测) */
export type LayoutOptions = {
  /** 卡片高度 */
  height: number

  /** 色场高度覆盖值 */
  blurHeight?: number

  /** 黑罩高度覆盖值 */
  scrimHeight?: number

  /** 色场高度占卡片高度的比例, 默认 ds.BLUR_HEIGHT_RATIO */
  blurRatio?: number

  /** 氛围层溢出高度占卡片高度的比例, 默认 ds.AMBIENT_SPREAD_RATIO */
  ambientSpreadRatio?: number
}

/** useCoverBlur 入参 */
export type UseCoverBlurOptions = {
  /** 封面原始地址 */
  src: Props['src']

  /** 已经处理过 CDN / 尺寸的缩略图地址 */
  blurSrc: Props['src']

  /** 卡片高度 */
  height: number

  /** 色场高度覆盖值 */
  blurHeight?: number

  /** 黑罩高度覆盖值 */
  scrimHeight?: number
}
