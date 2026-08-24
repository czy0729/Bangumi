/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:36:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 19:47:53
 */
import type { Subject, SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId?: SubjectId

  /** 条目部分数据 */
  subject?: Partial<Subject>

  /** 已看集数 */
  epStatus?: string | number

  /** 提示文案 */
  tip?: string

  /** 收藏时间 (游戏才有) */
  time?: string
}
