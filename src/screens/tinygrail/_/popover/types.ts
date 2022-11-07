/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 05:29:45
 */
import { EventType, Id, Navigation, SubjectId } from '@types'

export type Props = {
  id?: Id
  relation?: any[]
  subject?: any
  subjectId?: SubjectId
  event?: EventType
  onCollect?: (id: any) => any
}

export type Context = {
  navigation: Navigation
}
