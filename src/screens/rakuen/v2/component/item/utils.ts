/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:16:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-29 00:00:00
 */
import { rakuenStore } from '@stores'
import { getIsBlocked, getIsBlockedUser } from '@utils'
import { IMG_DEFAULT_AVATAR } from '@constants'
import { AD_REPLIES_COUNT } from './ds'

import type { TopicId, UserId } from '@types'

/** 预编译正则：匹配数字 */
const RE_DIGITS = /\d+/g

/** 匹配 userId, 有 userId 的头像可以跳转到用户空间 */
export function getUserId(avatar: string) {
  let userId: string
  const match = avatar?.match(/\/(\d+).jpg/)
  if (match) userId = match[1]
  return userId
}

/** 帖子 ID */
export function getTopicId(href: string = '') {
  return href.replace('/rakuen/topic/', '') as TopicId
}

/** 回复数 */
export function getReplyCount(replies: string = '') {
  const match = String(replies).match(RE_DIGITS)
  return match ? Number(match[0]) : 0
}

/** 是否小组 */
export function getIsGroup(topicId: string = '') {
  return topicId?.includes('group/')
}

/**
 * 检查帖子是否被屏蔽 (合并 4 项检查, 直接从 rakuenStore 读取数据)
 */
export function isTopicBlocked(
  title: string,
  groupCn: string,
  userName: string,
  userId: UserId,
  avatar: string,
  replyCount: number,
  topicId: string,
  index: number
): boolean {
  const { setting, blockUserIds } = rakuenStore
  const uuid = `Rakuen|${topicId}|${index}`

  return (
    getIsBlocked(setting.blockKeywords, title, uuid) ||
    getIsBlocked(setting.blockGroups, groupCn, uuid) ||
    getIsBlockedUser(blockUserIds, userName, userId, uuid) ||
    (setting.isBlockDefaultUser && avatar === IMG_DEFAULT_AVATAR && replyCount < AD_REPLIES_COUNT)
  )
}
