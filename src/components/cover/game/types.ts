/*
 * @Author: czy0729
 * @Date: 2026-08-18 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 14:30:00
 */
import type { Props as CoverProps } from '../types'

export type Props = Pick<
  CoverProps,
  | 'containerStyle'
  | 'bodyStyle'
  | 'angleStyle'
  | 'imageStyle'
  | 'src'
  | 'imageViewerSrc'
  | 'textOnly'
  | 'fallback'
  | 'size'
  | 'width'
  | 'height'
>
