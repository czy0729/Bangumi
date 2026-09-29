/*
 * @Author: czy0729
 * @Date: 2026-09-29 17:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 17:10:00
 */
import type { SubjectId } from '@types'

export type Props = {
  /** 在整周列表中的下标（用于 InView 预估位置） */
  index: number

  /** 条目 Id */
  subjectId: SubjectId

  /** 封面地址 */
  image: string

  /** 显示名 */
  name: string
}
