/*
 * @Author: czy0729
 * @Date: 2021-11-26 04:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 16:17:15
 */
import { rakuenStore } from '@stores'
import { UserId } from '@types'

/** 记录每个楼层的高度 */
export const layoutHeightMap = new Map<number, number>()

/** 处理屏蔽用户, 追踪计数 uuid */
const memoBlockedUser = new Map<string, true>()

/** 是否屏蔽用户 */
export function isBlockUser(userId: UserId, userName: string, replySub = '', trackUUID?: string) {
  const findIndex = rakuenStore.blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (itemUserId === 'undefined') return itemUserName === userName

    /**
     * userId 可能是用户更改后的英文单词, 但是外面屏蔽的 userId 一定是整数 ID
     * 所以需要优先使用 subReply('group',361479,1773295,0,456208,[572818],0) 中的 userId 进行匹配
     */
    if (replySub) {
      const splits = replySub.split(',')
      if (splits.length === 7 && itemUserId == splits[5]) return true
    }

    return itemUserId == userId || itemUserName === userName
  })

  const isBlock = findIndex !== -1
  if (isBlock && trackUUID) {
    const key = `${userId}|${trackUUID}`
    if (!memoBlockedUser.has(key)) {
      memoBlockedUser.set(key, true)
      setTimeout(() => {
        rakuenStore.trackBlockedUser(userId)
      }, 0)
    }
  }

  return isBlock
}

/** 是否特殊显示楼层 */
export function isSpecFloor(text: string, subLength: number) {
  // 屏蔽内容删除
  if (rakuenStore.setting.filterDelete && text.includes('删除了回复')) return true

  // 有子楼层或者本楼层文本很长
  if (subLength || text.length > 10) return false

  return (
    text.toLocaleLowerCase().includes('mark') ||
    text.includes('+1') ||
    text.includes('马克') ||
    text.includes('插眼') ||
    text === '1' ||
    text === 'm'
  )
}
