/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:40:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 12:05:39
 */
import { EventType, MonoId, Navigation, SubjectId, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  event?: EventType
  index?: number
  id?: MonoId
  name?: string
  nameCn?: string
  cover?: string
  subject?: {
    id?: SubjectId
    name?: string
    nameCn?: string
    cover?: string
    staff?: string
  }[]
  children?: any
}
