/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:19:22
 */
import { getTimestamp } from '@utils'
import { systemStore, userStore } from '@stores'
import { UserId } from '@types'
import { D1_TS, D3_TS } from './ds'

/** 获取用户当前在线状态 */
export function getUserStatus(userId: UserId) {
  const { onlineStatus } = systemStore.setting
  const lastTS = onlineStatus ? userStore.onlines(userId) : 0
  if (!lastTS) return false

  const ts = getTimestamp()
  const distance = ts - lastTS
  if (distance > D3_TS) return false

  if (distance >= D1_TS) return 'Warning'

  return 'Success'
}
