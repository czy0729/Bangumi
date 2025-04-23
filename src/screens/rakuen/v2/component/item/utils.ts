/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:16:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:38:49
 */
import { appNavigate, confirm, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, IMG_DEFAULT_AVATAR, LIMIT_TOPIC_PUSH } from '@constants'
import { Navigation, TopicId } from '@types'
import { Ctx } from '../../types'
import { AD_REPLIES_COUNT } from './ds'

/** 处理屏蔽用户 */
export function getIsBlockedUser(blockUserIds: string[], userName: string, userId: string) {
  const findIndex = blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (!itemUserId || itemUserId === 'undefined') return itemUserName === userName

    return itemUserId === userId
  })

  return findIndex !== -1
}

/** 设置开启屏蔽默认头像, 且回复数小于 AD_REPLIES_COUNT, 鉴定为广告姬 */
export function getIsAd(isBlockDefaultUser: boolean, avatar: string, replyCount: number) {
  return isBlockDefaultUser && avatar === IMG_DEFAULT_AVATAR && replyCount < AD_REPLIES_COUNT
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

export function handlePress(
  navigation: Navigation,
  onItemPress: Ctx['$']['onItemPress'],
  { avatar, group, href, replyCount, time, title, topicId, userId, userName }
) {
  const go = () => {
    appNavigate(
      href,
      navigation,
      {
        _title: title,
        _replies: `+${replyCount}`,
        _group: group,
        _time: time,
        _avatar: avatar,
        _userName: userName,
        _userId: userId
      },
      {
        id: '超展开.跳转'
      }
    )

    setTimeout(() => {
      // 记录帖子查看历史详情
      onItemPress(topicId, replyCount)
    }, 400)
  }

  if (replyCount > LIMIT_TOPIC_PUSH) {
    confirm(
      '帖子内容基于网页分析, 帖子回复数过大可能会导致闪退, 仍使用 App 打开?',
      () => go(),
      undefined,
      () => {
        const url = `${HOST}${href}`
        t('超展开.跳转', {
          to: 'WebBrowser',
          url
        })
        setTimeout(() => {
          open(url)
        }, 800)
      }
    )
    return
  }

  go()
}
