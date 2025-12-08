/*
 * @Author: czy0729
 * @Date: 2025-10-11 16:34:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:56:26
 */
import type { Fn, UserId } from '@types'

export type Props = {
  data: readonly string[]
  avatar: string
  userId: UserId
  userName: string
  comment: string
  relatedId: string | number
  onSelect: Fn
}
