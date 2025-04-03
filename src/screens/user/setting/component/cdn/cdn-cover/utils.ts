/*
 * @Author: czy0729
 * @Date: 2024-04-21 17:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 01:12:43
 */
import { systemStore, userStore } from '@stores'
import { info } from '@utils'
import { APP_ADVANCE_CDN } from '@constants'
import advanceJSON from '@assets/json/advance.json'

export function waitToResetCDN() {
  setTimeout(() => {
    const result = systemStore.resetCDN()
    if (result) info('CDN 试用结束')
  }, 60 * 1000 * 10)
}

export async function checkAdvance() {
  const { myId, myUserId } = userStore
  if (myId || myUserId) {
    const value = advanceJSON[myId] || advanceJSON[myUserId]
    if (value == 1) {
      info('你是老打赏用户或特殊关照用户，允许开启')
      return true
    }

    const [, amount] = String(value).split('|')
    if (Number(amount || 0) >= APP_ADVANCE_CDN) return true
  }

  // 获取历史打赏金额
  const value = await systemStore.fetchAdvanceDetail()
  if (value == 1) {
    info('你是老打赏用户或特殊关照用户，允许开启')
    return true
  }

  const [, amount] = String(value).split('|')
  if (Number(amount || 0) >= APP_ADVANCE_CDN) return true

  info(`历史打赏为 ${amount}，不足条件 ${APP_ADVANCE_CDN}`)
  return false
}
