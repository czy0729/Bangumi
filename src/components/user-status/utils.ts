/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:19:22
 */
import { systemStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { D, D3, D7 } from '@constants'

import type { UserId } from '@types'

/** 按距上次在线的秒数返回徽标类型 */
export function getStatusByDistance(distance: number): 'success' | 'warning' | 'disabled' {
  if (distance >= D3) return 'disabled'
  if (distance >= D) return 'warning'
  return 'success'
}

/** 依据最后在线时间返回徽标显示信息 (超过 D7 视为离线不显示) */
export function getStatusByLast(
  lastTS: number,
  now: number
): { show: boolean; type: 'success' | 'warning' | 'disabled' } {
  const distance = now - lastTS
  if (distance > D7) return { show: false, type: 'success' }

  return { show: true, type: getStatusByDistance(distance) }
}

/** 依据数据源返回用户在线状态 (zone 头像用, 超过 D3 视为离线) */
export function getUserStatusByData(onlineStatus: boolean, lastTS: number, now: number) {
  if (!onlineStatus || !lastTS) return false

  const distance = now - lastTS
  if (distance >= D3) return false

  return getStatusByDistance(distance) === 'warning' ? 'Warning' : 'Success'
}

/** 获取用户当前在线状态 */
export function getUserStatus(userId: UserId) {
  return getUserStatusByData(systemStore.setting.onlineStatus, userStore.onlines(userId), getTimestamp())
}
