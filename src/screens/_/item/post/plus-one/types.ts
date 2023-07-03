/*
 * @Author: czy0729
 * @Date: 2022-10-13 05:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-13 05:14:54
 */
import { EventType, Id, UserId } from '@types'

export type Props = {
  id: Id
  message: string
  userId: UserId
  userName: string
  avatar: string
  url: string
  directFloor?: boolean
  isAuthor?: boolean
  isFriend?: boolean
  isLayer?: boolean
  event: EventType
}
