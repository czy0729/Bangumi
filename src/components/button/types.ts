/*
 * @Author: czy0729
 * @Date: 2022-08-12 05:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-18 15:39:22
 */
import { ViewStyle, TextStyle, Fn } from '@types'

export type Props = {
  /** 按钮重置样式 */
  style?: ViewStyle

  /** 文字重置样式 */
  styleText?: TextStyle

  /** 预设主题 */
  type?:
    | 'plain'
    | 'main'
    | 'primary'
    | 'warning'
    | 'wait'
    | 'disabled'
    | 'dropped'
    | 'bid'
    | 'ask'
    | 'ghostMain'
    | 'ghostPrimary'
    | 'ghostSuccess'
    | 'ghostPlain'

  /** 预设大小 */
  size?: 'sm' | 'md'

  /** 是否显示阴影 */
  shadow?: boolean

  /** 是否圆角 */
  radius?: boolean

  /** 是否显示加载指示器 */
  loading?: boolean

  /** 强制文字加粗 */
  bold?: boolean

  /** 放在文字右边 */
  extra?: any

  /** 点击缩放动画 */
  animate?: boolean

  /** 文字是否允许换行 */
  noWrap?: boolean

  /** (Web) 会转换成 html 的 title */
  'data-title'?: string

  /** 点击回调 */
  onPress?: Fn

  /** 长按回调 */
  onLongPress?: Fn

  /** 文字 */
  children?: any
}
