/*
 * @Author: czy0729
 * @Date: 2025-10-07 21:16:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:19:35
 */
import type { Subject, SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 条目部分数据 */
  subject: Partial<Subject>

  /** 点击回调 */
  onPress?: () => void
}
