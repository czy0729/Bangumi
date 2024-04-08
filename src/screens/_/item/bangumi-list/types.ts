/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:14:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:23:00
 */
import { EventType, Navigation, SubjectId, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  event?: EventType
  subjectId?: SubjectId
  image?: string
  name?: string
}
