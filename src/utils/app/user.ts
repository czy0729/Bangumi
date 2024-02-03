/*
 * @Author: czy0729
 * @Date: 2023-12-23 06:33:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 16:12:10
 */
import { UserId } from '@types'
import { syncRakuenStore } from '../async'
import { BLOCKED_USER_UUID } from './ds'

/** 处理屏蔽用户 */
export function getIsBlockUser(
  blockUserIds: string[],
  userName: string,
  userId: UserId,
  trackUUID?: string
) {
  const findIndex = blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (!itemUserId || itemUserId === 'undefined') return itemUserName === userName
    return itemUserId === userId
  })

  const isBlock = findIndex !== -1
  if (isBlock && trackUUID) {
    const key = `${userId}|${trackUUID}`
    if (!BLOCKED_USER_UUID[key]) {
      BLOCKED_USER_UUID[key] = 1
      setTimeout(() => {
        syncRakuenStore().trackBlockedUser(userId)
      }, 0)
    }
  }

  return isBlock
}
