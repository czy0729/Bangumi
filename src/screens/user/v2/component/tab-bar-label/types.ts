/*
 * @Author: czy0729
 * @Date: 2023-12-31 10:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * TabBarLabel 外层与内容组件的 Props
 */
import type { CollectionStatusCn, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 标签文字 */
  title: CollectionStatusCn

  /** 是否选中 */
  focused?: boolean
}>

export type LabelProps = WithViewStyles<{
  /** 标签文字 */
  title: string

  /** 数量 */
  count?: number

  /** 是否选中 */
  focused?: boolean
}>
