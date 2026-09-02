/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:13:30
 */
import type { ColorValue, ViewStyle } from '@types'
import type { IconfontNames } from '../../iconfont/types'
import type { TouchableHandlePress } from '../../touchable/types'

/** ToolBar.Icon 图标按钮的属性 */
export type Props = {
  /** Iconfont 图标名称 */
  icon: IconfontNames

  /** 图标容器样式 */
  iconStyle?: ViewStyle

  /** 图标大小 */
  iconSize?: number

  /** 图标颜色 */
  iconColor?: ColorValue

  /** 点击回调 */
  onSelect: TouchableHandlePress
}
