/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-16 22:57:10
 */
import React, { useCallback } from 'react'
import { rakuenStore, useStore } from '@stores'
import { appNavigate, confirm, findSubjectCn, getIsBlocked, getIsBlockedUser, open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST, LIMIT_TOPIC_PUSH } from '@constants'
import Item from './item'
import { getIsAd, getIsGroup, getReplyCount, getTopicId, getUserId } from './utils'
import { COMPONENT, LIMIT_HEAVY } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ItemWrap({
  index,
  avatar,
  userId,
  userName,
  group,
  groupHref,
  href,
  title,
  time,
  replies
}: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const topicId = getTopicId(href)
  const replyCount = getReplyCount(replies)

  const handleCallback = useCallback(() => {
    if ($.state.swiping) return

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
      rakuenStore.updateTopicReaded(topicId, replyCount)
    }, 400)
  }, [$, avatar, group, href, navigation, replyCount, time, title, topicId, userId, userName])

  const handlePress = useCallback(() => {
    if (replyCount > LIMIT_TOPIC_PUSH) {
      confirm(
        '帖子内容基于网页分析, 帖子回复数过大可能会导致闪退, 仍使用客户端打开?',
        () => handleCallback(),
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

    handleCallback()
  }, [handleCallback, href, replyCount])

  return useObserver(() => {
    if (index >= LIMIT_HEAVY && !$.state._mounted) return null

    const groupCn = findSubjectCn(group)
    const itemUserId = userId || getUserId(avatar)
    const replyCount = getReplyCount(replies)
    const uuid = `Rakuen|${topicId}|${index}`
    if (
      getIsBlocked(rakuenStore.setting.blockKeywords, title, uuid) ||
      getIsBlocked(rakuenStore.setting.blockGroups, groupCn, uuid) ||
      getIsBlockedUser(rakuenStore.blockUserIds, userName, itemUserId, uuid) ||
      getIsAd(rakuenStore.setting.isBlockDefaultUser, avatar, replyCount)
    ) {
      return null
    }

    return (
      <Item
        styles={memoStyles()}
        index={index}
        avatar={avatar}
        userId={itemUserId}
        userName={userName}
        groupHref={groupHref}
        groupCn={groupCn}
        href={href}
        title={title}
        time={time}
        topicId={topicId}
        replyCount={replyCount}
        isGroup={getIsGroup(topicId)}
        onPress={handlePress}
      />
    )
  })
}

export default ItemWrap
