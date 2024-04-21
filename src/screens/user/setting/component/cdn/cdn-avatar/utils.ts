/*
 * @Author: czy0729
 * @Date: 2024-04-21 16:39:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-21 16:52:39
 */
import { systemStore, userStore } from '@stores'
import { info } from '@utils'
import { ADVANCE_CDN } from '@constants'
import DS from '@assets/json/advance.json'

export async function checkAdvance() {
  if (!systemStore.advance) {
    info('此为高级会员功能')
    return false
  }

  const { myId, myUserId } = userStore
  if (myId || myUserId) {
    const value = DS[myId] || DS[myUserId]
    if (value == 1) {
      info('你是老打赏用户或特殊关照会员，允许开启')
      return true
    }

    const [, amount] = String(value).split('|')
    if (Number(amount || 0) >= ADVANCE_CDN) return true
  }

  // 获取历史打赏金额
  const value = await systemStore.fetchAdvanceDetail()
  if (value == 1) {
    info('你是老打赏用户或特殊关照会员，允许开启')
    return true
  }

  const [, amount] = String(value).split('|')
  if (Number(amount || 0) >= ADVANCE_CDN) return true

  info(`历史打赏为 ${amount}，不足条件 ${ADVANCE_CDN}`)
  return false
}
