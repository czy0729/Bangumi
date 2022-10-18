/*
 * @Author: czy0729
 * @Date: 2021-11-26 04:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 04:45:05
 */
import { rakuenStore } from '@stores'
import { UserId } from '@types'

/** 是否屏蔽用户 */
export function isBlockUser(userId: UserId, userName: string, replySub = '') {
  const { blockUserIds } = rakuenStore.setting
  const findIndex = blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (itemUserId === 'undefined') return itemUserName === userName

    // userId 可能是用户更改后的英文单词, 但是外面屏蔽的 userId 一定是整数 id
    // 所以需要优先使用 subReply('group',361479,1773295,0,456208,[572818],0) 中的 userId 进行匹配
    if (replySub) {
      const splits = replySub.split(',')
      if (splits.length === 7 && itemUserId == splits[5]) return true
    }

    return itemUserId == userId || itemUserName === userName
  })

  return findIndex !== -1
}
