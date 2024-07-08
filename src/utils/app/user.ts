/*
 * @Author: czy0729
 * @Date: 2023-12-23 06:33:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 16:12:10
 */
import { UserId } from '@types'
import { syncRakuenStore } from '../async'

/** 处理屏蔽用户, 追踪计数 uuid */
const memoBlockedUser = new Map<string, true>()

/** 处理屏蔽用户 */
export function getIsBlockedUser(
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
    if (!memoBlockedUser.has(key)) {
      memoBlockedUser.set(key, true)
      setTimeout(() => {
        syncRakuenStore().trackBlockedUser(userId)
      }, 0)
    }
  }

  return isBlock
}

/** 处理屏蔽关键字, 追踪计数 uuid */
const memoBlocked = new Map<string, true>()

/** 处理屏蔽关键字 */
export function getIsBlocked(blockKeywords: string[], keyword: string, trackUUID?: string) {
  const isBlock = blockKeywords.some(item => keyword.includes(item))
  if (isBlock && trackUUID) {
    const key = `${keyword}|${trackUUID}`
    if (!memoBlocked.has(key)) {
      memoBlocked.set(key, true)
      setTimeout(() => {
        syncRakuenStore().trackBlocked(keyword)
      }, 0)
    }
  }

  return isBlock
}
