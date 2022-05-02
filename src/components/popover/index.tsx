/*
 * @Author: czy0729
 * @Date: 2022-05-02 11:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 11:58:21
 */
import React from 'react'
import { ViewStyle, ReactNode } from '@types'
import { Todo } from '../todo'

type Props = {
  style?: ViewStyle

  /** 菜单项 */
  data?: string[]

  /** 菜单位置 (iOS only) */
  placement?: string

  /** 菜单样式 (iOS only) */
  menuStyle?: ViewStyle

  /** 菜单 Node (iOS only) */
  overlay?: ReactNode

  /** 菜单选择 */
  onSelect?: (title: string) => any

  /** 菜单长按选择 (不推荐使用) */
  onLongPress?: (title: string) => any

  children?: ReactNode
}

export const Popover = (props: Props) => {
  return <Todo {...props} />
}
