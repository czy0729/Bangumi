/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 16:10:20
 */
import React from 'react'
import { findSubjectCn, getIsBlockUser } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import {
  getIsAd,
  getIsBlockGroup,
  getIsBlockKeyword,
  getIsGroup,
  getReplyCount,
  getTopicId,
  getUserId,
  handlePress
} from './utils'
import { COMPONENT, LIMIT_HEAVY } from './ds'
import { memoStyles } from './styles'

function ItemWrap(
  { index, avatar, userId, userName, group, groupHref, href, title, time, replies },
  { $, navigation }: Ctx
) {
  if (index >= LIMIT_HEAVY && !$.state._mounted) return null

  const topicId = getTopicId(href)
  const groupCn = findSubjectCn(group)
  const itemUserId = userId || getUserId(avatar)
  const replyCount = getReplyCount(replies)
  if (
    getIsBlockKeyword($.setting.blockKeywords, title) ||
    getIsBlockGroup($.setting.blockGroups, groupCn) ||
    getIsBlockUser($.setting.blockUserIds, userName, itemUserId, `Rakuen|${topicId}|${index}`) ||
    getIsAd($.setting.isBlockDefaultUser, avatar, replyCount)
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
      onPress={() =>
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
      }
    />
  )
}

export default obc(ItemWrap, COMPONENT)
