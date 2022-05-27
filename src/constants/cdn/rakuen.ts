/*
 * @Author: czy0729
 * @Date: 2022-05-23 06:46:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:20:23
 */
import { Id, UserId } from '@types'
import { HOST_CDN } from '../constants'
import { VERSION_RAKUEN } from './ds'
import { getVersion, getFolder } from './utils'

const HOST_RAKUEN = `${HOST_CDN}/gh/czy0729/Bangumi-Rakuen`

/** 超展开小组 CDN 自维护数据 */
export const CDN_RAKUEN = (topicId: Id, type: 'topic' | 'comment' = 'topic') => {
  const v = getVersion('VERSION_RAKUEN', VERSION_RAKUEN)
  return `${HOST_RAKUEN}@${v}/data/${type}/${getFolder(topicId)}/${topicId}.json`
}

/** 某用户的超展开 */
export const CDN_RAKUEN_USER_TOPICS = (userId: UserId) => {
  const v = getVersion('VERSION_RAKUEN', VERSION_RAKUEN)
  return `${HOST_RAKUEN}@${v}/data/user/${String(userId).slice(0, 1)}/${userId}.json`
}
