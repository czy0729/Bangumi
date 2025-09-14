/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 12:06:36
 */
import { EventType, Id, SubjectId } from '@types'

export type Props = {
  id?: Id
  relation?: any[]
  subject?: any
  subjectId?: SubjectId
  event?: EventType
  onCollect?: (id: any) => any
}
