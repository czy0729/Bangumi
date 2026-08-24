/*
 * @Author: czy0729
 * @Date: 2025-10-07 21:10:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:11:44
 */
import type { SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 已看集数 */
  epStatus: number

  /** 已看卷数 (仅书籍场景) */
  volStatus: number
}
