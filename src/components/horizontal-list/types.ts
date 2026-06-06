/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:45:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 17:18:36
 */
import type { ReactNode } from 'react'
import type { TextProps } from 'react-native'
import type { SubjectTypeCn, ViewStyle, WithViewStyles } from '@types'

export type WithId = {
  id?: string | number
}

/** 条目类型中文 */
export type TypeCn = SubjectTypeCn | '角色' | ''

/** 条目数据基础类型 */
export type ItemData = WithId & {
  image?: string
  name?: string
  desc?: string
  reason?: string
}

export type Props<T extends WithId = ItemData> = WithViewStyles<{
  /** 内容容器样式 */
  contentContainerStyle?: ViewStyle

  /** 数据 */
  data: readonly T[]

  /** 数据 id: number */
  counts?: Record<string, number>

  /** 封面宽度 */
  width?: number

  /** 封面高度 */
  height?: number

  /** 是否条目名字查找中文 */
  findCn?: boolean

  /** 条目类型中文 */
  typeCn?: TypeCn

  /** 关联条目类型中文, 若有值则相关描述例如`不同演绎`会沿用此类型值 */
  relationTypeCn?: TypeCn

  /** 文本溢出显示方式, 在例如单行本中能显示话数, 而不会被溢出折叠 (iOS only) */
  ellipsizeMode?: TextProps['ellipsizeMode']

  /** 未滑动的情况下，最多显示多少项 */
  initialRenderNums?: number

  /** 是否懒渲染 */
  scrolled?: boolean

  /** 是否显示左右溢出遮罩 */
  showMask?: boolean

  /** 是否对数据排序（默认 true，没封面图的置后） */
  sortData?: boolean

  /** 自定义渲染项 */
  renderItem?: (item: T, index: number) => ReactNode

  /** 渲染额外数量提示 */
  renderNums?: () => ReactNode

  /** 水平滑动到右侧回调 */
  onEndReachedOnce?: () => void

  /** item 点击回调 */
  onPress?: (payload: T, typeCn?: TypeCn) => void

  /** item 描述点击回调 */
  onSubPress?: (payload: T) => void
}>
