/*
 * @Author: czy0729
 * @Date: 2024-11-14 20:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-19 05:51:22
 */
import type { SubjectId } from '@types'
import type { TabsLabel } from '../../../types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 当前 Tab 标题 */
  title: TabsLabel

  /** 日文名 */
  name: string

  /** 中文名 */
  name_cn: string
}
