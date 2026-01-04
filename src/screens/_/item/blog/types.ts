/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-03 06:24:17
 */
import type { EventType, Id, SubjectId, SubjectTypeCn, UserId, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  index: number
  event?: EventType
  id: Id
  cover: string
  title: string
  content: string
  username?: string
  userId?: UserId
  subject?: string
  subjectId?: SubjectId
  typeCn?: SubjectTypeCn
  time: string
  replies: string
  tags: string[] | string
}>
