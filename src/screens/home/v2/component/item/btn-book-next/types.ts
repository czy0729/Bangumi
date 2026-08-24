/*
 * @Author: czy0729
 * @Date: 2025-10-08 06:07:24
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-08 06:07:24
 */
import type { SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 已看集数 */
  epStatus: string | number

  /** 已看卷数 */
  volStatus: string | number
}
