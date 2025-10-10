/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:14:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-10 16:26:53
 */
import { EventType, SubjectId, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  event?: EventType
  subjectId?: SubjectId
  image?: string
  name?: string
}
