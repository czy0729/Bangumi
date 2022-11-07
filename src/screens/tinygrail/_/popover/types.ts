/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 18:54:43
 */
import { EventType, Navigation, SubjectId } from '@types'

export type Props = {
  id: string
  relation: any[]
  subject: any
  subjectId: SubjectId
  event: EventType
  onCollect: (id: any) => any
}

export type Context = {
  navigation: Navigation
}
