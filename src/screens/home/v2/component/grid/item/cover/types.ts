/*
 * @Author: czy0729
 * @Date: 2025-10-08 00:23:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:23:58
 */
import type { Subject, SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 条目部分数据 */
  subject: Partial<Subject>

  /** 已看集数 */
  epStatus: string | number
}
