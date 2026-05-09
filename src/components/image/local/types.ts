/*
 * @Author: czy0729
 * @Date: 2026-05-09 18:14:02
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-09 18:14:02
 */
import type { ImageStyle as RNImageStyle } from 'react-native'
import type { AnyObject, ImageSource } from '@types'
import type { Props as ParentProps } from '../types'

export type Props = Pick<
  ParentProps,
  'headers' | 'onError' | 'onLongPress' | 'onPress' | 'scale' | 'withoutFeedback' | 'delay'
> & {
  style?: RNImageStyle
  overrideHeaders?: AnyObject
  src: ImageSource | string
  onLoadEnd?: () => void
}
