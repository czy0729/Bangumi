/*
 * @Author: czy0729
 * @Date: 2026-11-07 01:38:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * SectionHeader 组件 Props
 */
import type { CollectionStatusCn } from '@types'

export type Props = {
  /** 分组标题 */
  title: string

  /** 收藏状态 */
  status: CollectionStatusCn

  /** 条目数 */
  count: number
}
