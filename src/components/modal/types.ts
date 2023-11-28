/*
 * @Author: czy0729
 * @Date: 2022-11-07 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 05:10:06
 */
import { ViewStyle } from '@types'
import { TextType } from '../text/types'

export type Props = {
  style?: ViewStyle

  /** 是否显示 */
  visible: boolean

  /** 是否键盘聚焦中，若为真会往上移动一段距离 */
  focus?: boolean

  /** 标题 */
  title?: string

  /** 文字颜色 */
  type?: TextType

  /** [网页] 是否显示渐出动画 */
  animated?: boolean

  /** 关闭回调 */
  onClose: () => void
  children: any
}
