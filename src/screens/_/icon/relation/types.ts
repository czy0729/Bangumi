/*
 * @Author: czy0729
 * @Date: 2025-12-15 13:25:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 20:29:09
 */
import type { SubjectId, SubjectTypeValue, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  subjectId: SubjectId
  type: SubjectTypeValue
  name?: string
}
