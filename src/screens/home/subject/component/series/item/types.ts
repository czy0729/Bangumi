/*
 * @Author: czy0729
 * @Date: 2026-10-21 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 */
import type { SubjectFromHtmlRelationsItem } from '@stores/subject/types'

export type Props = {
  /** 关系类型标签 (前传 / 续集 / 动画 / 不同演绎 / 书籍) */
  from: string

  /** 关联条目 */
  data: SubjectFromHtmlRelationsItem
}
