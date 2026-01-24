/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:45:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-25 07:37:16
 */
import type { Props as ImageProps } from '../../image/types'

export type Props = ImageProps & {
  show?: boolean
  onImageFallback?: (arg0?: any) => any
}

export type ToggleImageCache = {
  touched: true
  show: boolean
}
