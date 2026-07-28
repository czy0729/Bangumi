/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:23:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 16:26:00
 */
import type { ViewProps } from 'react-native'
import type { TextStyle, ViewStyle } from '@types'
import type { RenderLabel } from '../../types'

export interface Props {
  /** 标签文字 */
  title: string

  /** 标签唯一标识 */
  tabKey: string

  /** 容器样式 */
  style?: ViewStyle

  /** 标签文字样式 */
  labelStyle?: TextStyle

  /** 自定义标签渲染函数 */
  renderLabel?: RenderLabel

  /** 点击回调 */
  onPress?: () => void

  /** 布局事件回调 */
  onLayout: ViewProps['onLayout']
}
