/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:21:17
 */
import React from 'react'
import { View } from 'react-native'
import { appNavigate, confirm, findSubjectCn, getIsBlockUser, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, LIMIT_TOPIC_PUSH } from '@constants'
import Item from './item'
import { Ctx } from '../types'
import { LIMIT_HEAVY } from './ds'
import {
  getIsAd,
  getIsBlockGroup,
  getIsBlockKeyword,
  getIsGroup,
  getReplyCount,
  getTopicId,
  getUserId
} from './utils'
import { memoStyles } from './styles'

export default obc(
  (
    { index, avatar, userId, userName, group, groupHref, href, title, time, replies },
    { $, navigation }: Ctx
  ) => {
    // global.rerender('Rakuen.Item')

    const { _mounted } = $.state
    if (index >= LIMIT_HEAVY && !_mounted) {
      const styles = memoStyles()
      return <View style={styles.placeholder} />
    }

    const { blockKeywords, blockGroups, blockUserIds, isBlockDefaultUser } = $.setting
    const groupCn = findSubjectCn(group)
    const _userId = userId || getUserId(avatar)
    const replyCount = getReplyCount(replies)
    const topicId = getTopicId(href)
    if (
      getIsBlockKeyword(blockKeywords, title) ||
      getIsBlockGroup(blockGroups, groupCn) ||
      getIsBlockUser(blockUserIds, userName, _userId, `Rakuen|${topicId}|${index}`) ||
      getIsAd(isBlockDefaultUser, avatar, replyCount)
    ) {
      return null
    }

    const styles = memoStyles()
    return (
      <Item
        styles={styles}
        index={index}
        avatar={avatar}
        userId={_userId}
        userName={userName}
        groupHref={groupHref}
        groupCn={groupCn}
        href={href}
        title={title}
        time={time}
        topicId={topicId}
        replyCount={replyCount}
        isReaded={!!$.readed(topicId).time}
        isGroup={getIsGroup(topicId)}
        onPress={() => {
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
              $.onItemPress(topicId, replyCount)
            }, 400)
          }

          if (replyCount > LIMIT_TOPIC_PUSH) {
            confirm(
              '帖子内容基于网页分析, 帖子回复数过大可能会导致闪退, 仍使用App打开?',
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
        }}
      />
    )
  }
)
