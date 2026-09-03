/*
 * @Author: czy0729
 * @Date: 2022-05-23 06:46:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:07:58
 */
import { HOST_CDN } from '../host'
import { getFolder, getVersion } from './utils'
import { HOST_DOGE, VERSION_RAKUEN } from './ds'

import type { Id, UserId } from '@types'

const HOST_RAKUEN = `${HOST_CDN}/gh/czy0729/Bangumi-Rakuen` as const

/** 超展开小组 CDN 自维护数据 */
export const CDN_RAKUEN = (topicId: Id, type: 'topic' | 'comment' = 'topic') => {
  const v = getVersion('VERSION_RAKUEN', VERSION_RAKUEN)
  return `${HOST_RAKUEN}@${v}/data/${type}/${getFolder(topicId)}/${topicId}.json` as const
}

/** 某用户的超展开 */
export const CDN_RAKUEN_USER_TOPICS = (userId: UserId) => {
  return `${HOST_DOGE}/encrypt/bangumi-rakuen/user/${String(userId).slice(
    0,
    1
  )}/${userId}.txt` as const
}
