/*
 * @Author: czy0729
 * @Date: 2026-10-16 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 12:00:00
 *
 * 标签条目组件类型
 */
import type { SubjectType } from '@types'
import type { TagsItem } from '../../types'

export type Props = TagsItem & {
  /** 条目类型 */
  type: SubjectType

  /** 在列表中的索引 */
  index: number
}
