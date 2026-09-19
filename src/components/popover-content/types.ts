/*
 * @Author: czy0729
 * @Date: 2026-09-19 10:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 10:27:26
 */
import type { PropsWithChildren } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type Props = PropsWithChildren<{
  /** 是否显示, 同时控制淡入淡出与触摸拦截 */
  visible: boolean

  /** 内容滑入方向 */
  position?: 'top' | 'bottom'

  /** 容器样式, 需自带 position: absolute 与 top / left / right */
  style?: StyleProp<ViewStyle>
}>
