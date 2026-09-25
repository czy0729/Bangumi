/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:56:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 19:16:51
 */
import { usersStore } from '@stores'
import { queue } from '@utils'
import { logger } from '@utils/dev'
import { update } from '@utils/kv'
import { DEV } from '@constants'
import advanceJSON from '@assets/json/advance.json'

import type { User } from './types'

/** 头像文件名: 去掉域名与尺寸目录 */
function formatAvatarKey(avatar: string) {
  return avatar
    .split('?')[0]
    .split(/\/00(0|1)\//)[2]
    .replace('.jpg', '')
}

export async function devGetUsersInfo() {
  if (!DEV) return

  const USERS_MAP: Record<string, User> = {}
  const items = Object.keys(advanceJSON)
  await queue(
    items.map((userId, index) => async () => {
      try {
        const data = await usersStore.fetchUsers(userId)
        logger.info('devGetUsersInfo', `${index} / ${items.length}`)

        USERS_MAP[userId] = {
          n: data.userName
        }
        if (data.avatar) USERS_MAP[userId].a = formatAvatarKey(data.avatar)
        if (data.userId !== userId) USERS_MAP[userId].i = String(data.userId)
      } catch (error) {
        logger.error('devGetUsersInfo', error)
      }

      return true
    })
  )
  logger.info(JSON.stringify(USERS_MAP))

  update('sponsor_users_map', USERS_MAP)

  logger.info('devGetUsersInfo done')
}

export async function devLocalUsersInfo() {
  if (!DEV) return

  await usersStore.init('users')
  const USERS_MAP: Record<string, User> = {}
  Object.keys(advanceJSON).forEach(userId => {
    try {
      const data = usersStore.users(userId)
      USERS_MAP[userId] = {
        n: data.userName
      }
      if (data.avatar) USERS_MAP[userId].a = formatAvatarKey(data.avatar)
      if (data.userId !== userId) USERS_MAP[userId].i = String(data.userId)
    } catch (error) {
      logger.error('devLocalUsersInfo', error)
    }
  })

  update('sponsor_users_map', USERS_MAP)

  logger.info('done')
}
