/*
 * @Author: czy0729
 * @Date: 2025-10-11 16:34:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:54:31
 */
import type { CollectionStatusCn, UserId } from '@types'

export type Props = {
  userId: UserId
  userName: string
  avatar: string
  time: string
  status: CollectionStatusCn
}
