/*
 * @Author: czy0729
 * @Date: 2022-08-07 08:41:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:42:11
 */
import { Avatar, UserId } from '@types'

export type Props = {
  item: {
    avatar: Avatar<'l'>
    userId: UserId
    userName: string
    lastUserName: string
  }
}
