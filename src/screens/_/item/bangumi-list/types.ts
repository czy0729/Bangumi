/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:14:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:40:33
 */
import type { EventType, SubjectId, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  event?: EventType
  subjectId?: SubjectId
  image?: string
  name?: string
}>
