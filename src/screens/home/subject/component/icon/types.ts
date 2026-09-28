/*
 * @Author: czy0729
 * @Date: 2023-07-08 09:32:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 22:00:00
 *
 * 条目头部图标通用类型
 */
import type { ReactNode, SubjectId, ViewStyle } from '@types'

export type IconProps = {
  style?: ViewStyle
  children?: ReactNode
}

/** 关联条目列表项 (序列化后透传给 Overview, 形状同 Overview 的 ListItem) */
export type RelationListItem = {
  /** 条目 Id */
  id: SubjectId

  /** 封面 */
  image: string

  /** 名称 */
  name: string

  /** 类型描述 */
  desc?: string
}

/** 关联跳转图标 */
export type RelationProps = {
  /** 关联分类标题 */
  title: string

  /** 关联条目列表, 序列化后透传给 Overview */
  list: readonly RelationListItem[]
}
