/*
 *
 * @Author: czy0729
 * @Date: 2026-01-20 08:02:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-20 08:21:16
 *
 * API p1 接口
 * - https://bangumi.github.io/dev-docs/
 */
import { API_P1 } from '@constants'
import { request } from './utils'

import type { UserId } from '@types'
import type { ResponseUsersTimelineP1 } from './types'

/** 获取用户最近活跃时间, 请求失败返回 null (区别于无活跃记录的 0) */
export async function fetchUserActive(userId: UserId): Promise<number | null> {
  try {
    const data = await request<ResponseUsersTimelineP1>(
      `${API_P1}/users/${userId}/timeline?limit=1`
    )

    return data?.[0]?.createdAt || 0
  } catch (error) {
    return null
  }
}
