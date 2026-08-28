/*
 * @Author: czy0729
 * @Date: 2026-08-28 01:18:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 01:18:22
 */
import { systemStore, userStore } from '@stores'
import { info } from '@utils'
import { APP_ADVANCE_CDN } from '@constants'
import advanceJSON from '@assets/json/advance.json'

import type { Advance } from '@stores/system/types'

/** 待判定值: 打赏记录值, 或 fetchAdvanceDetail 的空结果 */
type AdvanceValue = Advance | false | 0 | undefined

/** 按阈值判断打赏金额是否满足条件 */
function isReachAmount(value: AdvanceValue) {
  if (!value) return false

  // 1 为老用户标记, Number 兼容历史数据中的字符串形式
  if (Number(value) === 1) return true

  const [, amount] = String(value).split('|')
  return Number(amount || 0) >= APP_ADVANCE_CDN
}

/**
 * 检查当前用户的打赏记录是否有权限开启高级 CDN
 *
 * @param tip 老打赏用户命中时的提示文案
 */
export async function checkAdvanceCDN(tip: string) {
  const { myId, myUserId } = userStore
  if (myId || myUserId) {
    const advance = advanceJSON as Record<string, Advance>
    if (isReachAmount(advance[myId] || advance[myUserId])) {
      info(tip)
      return true
    }
  }

  // 获取历史打赏金额
  const value = await systemStore.fetchAdvanceDetail()
  if (isReachAmount(value)) {
    info(tip)
    return true
  }

  const [, amount] = String(value).split('|')
  info(`历史打赏为 ${amount || 0}，不足条件 ${APP_ADVANCE_CDN}`)
  return false
}
