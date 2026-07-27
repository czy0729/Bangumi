/*
 * @Author: czy0729
 * @Date: 2026-05-09 18:14:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:38:34
 */
import type { ImageSource, ImageStyle } from '@types'
import type { Props as ParentProps } from '../types'

export type Props = Pick<
  ParentProps,
  'headers' | 'onError' | 'onLongPress' | 'onPress' | 'scale' | 'withoutFeedback' | 'delay'
> & {
  style?: ImageStyle
  overrideHeaders?: Record<string, string>
  src: ImageSource | string
  onLoadEnd?: () => void
}
