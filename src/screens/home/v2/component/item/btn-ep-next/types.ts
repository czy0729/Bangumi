/*
 * @Author: czy0729
 * @Date: 2025-10-08 16:49:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-08 16:49:34
 */
import type { SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 已看集数 */
  epStatus: string | number

  /** 是否列表第一项 */
  isFirst: boolean
}
