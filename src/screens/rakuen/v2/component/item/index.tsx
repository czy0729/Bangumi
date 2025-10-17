/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 16:07:18
 */
import React from 'react'
import { rakuenStore, useStore } from '@stores'
import { findSubjectCn, getIsBlocked, getIsBlockedUser } from '@utils'
import { useObserver } from '@utils/hooks'
import Item from './item'
import { getIsAd, getIsGroup, getReplyCount, getTopicId, getUserId, handlePress } from './utils'
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

  return useObserver(() => {
    if (index >= LIMIT_HEAVY && !$.state._mounted) return null

    const topicId = getTopicId(href)
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
        onPress={() => {
          handlePress(navigation, $.onItemPress, {
            avatar,
            group,
            href,
            replyCount,
            time,
            title,
            topicId,
            userId,
            userName
          })
        }}
      />
    )
  })
}

export default ItemWrap
