/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:19:22
 */
import { systemStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { D, D3 } from '@constants'
import { UserId } from '@types'

/** 获取用户当前在线状态 */
export function getUserStatus(userId: UserId) {
  const { onlineStatus } = systemStore.setting
  const lastTS = onlineStatus ? userStore.onlines(userId) : 0
  if (!lastTS) return false

  const ts = getTimestamp()
  const distance = ts - lastTS
  if (distance > D3) return false

  if (distance >= D) return 'Warning'

  return 'Success'
}
