/*
 * @Author: czy0729
 * @Date: 2025-12-15 13:25:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 01:21:30
 */
import type { SubjectId, SubjectTypeValue, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  subjectId: SubjectId
  type: SubjectTypeValue
  name?: string
}>
