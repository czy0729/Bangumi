/*
 * @Author: czy0729
 * @Date: 2022-05-23 06:46:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 14:04:10
 */
import { Id, UserId } from '@types'
import { HOST_CDN } from '../constants'
import { getFolder, getVersion } from './utils'
import { HOST_CDN_STATIC, HOST_DOGE, VERSION_RAKUEN } from './ds'

const HOST_RAKUEN = `${HOST_CDN}/gh/czy0729/Bangumi-Rakuen` as const

/** 超展开小组 CDN 自维护数据 */
export const CDN_RAKUEN = (topicId: Id, type: 'topic' | 'comment' = 'topic') => {
  const v = getVersion('VERSION_RAKUEN', VERSION_RAKUEN)
  return `${HOST_RAKUEN}@${v}/data/${type}/${getFolder(topicId)}/${topicId}.json` as const
}

/** 某用户的超展开 */
export const CDN_RAKUEN_USER_TOPICS = (userId: UserId) => {
  return `${HOST_DOGE}/bangumi-rakuen/user/${String(userId).slice(0, 1)}/${userId}.json` as const
}

/** @deprecated */
const _HOST_STATIC = `${HOST_CDN_STATIC}/Bangumi-Rakuen` as const

/** @deprecated 超展开小组 CDN 自维护数据 */
export const _CDN_RAKUEN = (topicId: Id, type: 'topic' | 'comment' = 'topic') => {
  return `${_HOST_STATIC}/data/${type}/${getFolder(topicId)}/${topicId}.json` as const
}

/** @deprecated 某用户的超展开 */
export const _CDN_RAKUEN_USER_TOPICS = (userId: UserId) => {
  return `${_HOST_STATIC}/data/user/${String(userId).slice(0, 1)}/${userId}.json` as const
}
