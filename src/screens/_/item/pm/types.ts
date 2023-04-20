/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:59:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:42:42
 */
import { EventType, Id, Navigation, UserId } from '@types'

export type Props = {
  navigation?: Navigation
  event?: EventType
  index?: number
  id?: Id
  title?: string
  content?: string
  avatar?: string
  name?: string
  userId?: UserId
  time?: string
  new?: boolean
  onRefresh?: () => any
}
