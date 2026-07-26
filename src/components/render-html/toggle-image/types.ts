/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:45:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 15:59:56
 */
import type { Props as ImageProps } from '../../image/types'

export type Props = ImageProps & {
  /** 是否显示图片 */
  show?: boolean

  /** 图片加载失败回调 */
  onImageFallback?: (src?: string) => void
}

export type ToggleImageCache = {
  /** 是否已触摸 */
  touched: true

  /** 是否显示 */
  show: boolean
}
