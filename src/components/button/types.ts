/*
 * @Author: czy0729
 * @Date: 2022-08-12 05:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 01:10:02
 */
import type { ReactNode, TextStyle, WithViewStyles } from '@types'
import type { GestureResponderEvent } from 'react-native'
import type { TouchableHandlePress } from '../touchable/types'

export type Props = WithViewStyles<{
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
  extra?: ReactNode

  /** 点击缩放动画 */
  animate?: boolean

  /** 文字是否允许换行 */
  noWrap?: boolean

  /** (Web) 会转换成 html 的 title */
  'data-title'?: string

  /** 点击回调 */
  onPress?: TouchableHandlePress

  /** 长按回调 */
  onLongPress?: (evt: GestureResponderEvent) => void

  /** 文字 */
  children?: ReactNode
}>
