/*
 * @Author: czy0729
 * @Date: 2026-05-09 18:16:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-09 18:16:07
 */
import type { Props as ParentProps } from '../types'

export type Props = Pick<
  ParentProps,
  | 'style'
  | 'autoSize'
  | 'autoHeight'
  | 'headers'
  | 'priority'
  | 'onError'
  | 'onLongPress'
  | 'onPress'
  | 'scale'
  | 'withoutFeedback'
  | 'delay'
> & {
  containerStyle?: ParentProps['style']
  uri: string
  fadeDuration?: number
  onLoadEnd?: () => void
}
