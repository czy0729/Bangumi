/*
 * @Author: czy0729
 * @Date: 2023-12-23 06:33:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 04:58:17
 */
import { UserId } from '@types'
import { syncRakuenStore } from '../async'
import { postTask } from '../scheduler'

/** 处理屏蔽用户, 追踪计数 uuid */
const memoBlockedUser = new Map<string, true>()

/**
 * 检查用户是否被屏蔽，并进行追踪
 * @param blockUserIds - 屏蔽用户 ID 列表（格式为 "用户名@用户ID"）
 * @param userName - 当前用户的用户名
 * @param userId - 当前用户的用户ID
 * @param trackUUID - 跟踪的 UUID（可选）
 * @returns 是否被屏蔽
 */
export function getIsBlockedUser(
  blockUserIds: string[],
  userName: string,
  userId: UserId,
  trackUUID?: string
): boolean {
  const isBlock =
    blockUserIds.findIndex(item => {
      const [itemUserName, itemUserId] = item.split('@')
      if (!itemUserId || itemUserId === 'undefined') return itemUserName === userName
      return itemUserId === userId
    }) !== -1

  if (isBlock && trackUUID) {
    const memoKey = `${userId}|${trackUUID}`
    if (!memoBlockedUser.has(memoKey)) {
      memoBlockedUser.set(memoKey, true)
      postTask(() => {
        syncRakuenStore().trackBlockedUser(userId)
      }, 0)
    }
  }

  return isBlock
}

/** 处理屏蔽关键字, 追踪计数 uuid */
const memoBlocked = new Map<string, true>()

/**
 * 检查关键词是否被屏蔽，并进行追踪
 * @param blockKeywords - 屏蔽关键字列表
 * @param keyword - 当前关键词
 * @param trackUUID - 跟踪的UUID（可选）
 * @returns 是否被屏蔽
 */
export function getIsBlocked(
  blockKeywords: string[] | readonly string[],
  keyword: string,
  trackUUID?: string
): boolean {
  const isBlock = blockKeywords.some(item => keyword.includes(item))

  if (isBlock && trackUUID) {
    const memoKey = `${keyword}|${trackUUID}`
    if (!memoBlocked.has(memoKey)) {
      memoBlocked.set(memoKey, true)
      postTask(() => {
        syncRakuenStore().trackBlocked(keyword)
      }, 0)
    }
  }

  return isBlock
}
