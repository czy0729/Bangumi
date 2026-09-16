/*
 * @Author: czy0729
 * @Date: 2026-05-09 18:16:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 20:28:00
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

  /**
   * 底层引擎 (安卓 FastImage) 的原始进度事件
   * 注意: 这里刻意不是 ParentProps['onProgress'] (统一形态), 由 Image 入口层解包 nativeEvent
   * */
  onProgress?: (event: { nativeEvent: { loaded: number; total: number } }) => void
}
