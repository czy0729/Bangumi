/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:16:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 20:28:04
 */
import { IMG_DEFAULT_AVATAR } from '@constants'
import { TopicId } from '@types'
import { AD_REPLIES_COUNT } from './ds'

/** 处理屏蔽关键字 */
export function getIsBlockKeyword(blockKeywords: string[], title: string) {
  return blockKeywords.some(item => title.includes(item))
}

/** 处理屏蔽小组 */
export function getIsBlockGroup(blockGroups: string[], group: string) {
  return blockGroups.includes(group)
}

/** 处理屏蔽用户 */
export function getIsBlockUser(
  blockUserIds: string[],
  userName: string,
  userId: string
) {
  const findIndex = blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (!itemUserId || itemUserId === 'undefined') return itemUserName === userName
    return itemUserId === userId
  })
  return findIndex !== -1
}

/** 设置开启屏蔽默认头像, 且回复数小于 AD_REPLIES_COUNT, 鉴定为广告姬 */
export function getIsAd(
  isBlockDefaultUser: boolean,
  avatar: string,
  replyCount: number
) {
  return (
    isBlockDefaultUser && avatar === IMG_DEFAULT_AVATAR && replyCount < AD_REPLIES_COUNT
  )
}

/** 匹配 userId, 有 userId 的头像可以跳转到用户空间 */
export function getUserId(avatar: string) {
  let userId: string
  const match = avatar?.match(/\/(\d+).jpg/)
  if (match) userId = match[1]
  return userId
}

/** 帖子 Id */
export function getTopicId(href: string = '') {
  return href.replace('/rakuen/topic/', '') as TopicId
}

/** 回复数 */
export function getReplyCount(replies: string = '') {
  return Number(String(replies).match(/\d+/g))
}

/** 是否小组 */
export function getIsGroup(topicId: string = '') {
  return topicId?.includes('group/')
}
