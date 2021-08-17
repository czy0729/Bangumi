/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-17 12:57:17
 */
import React from 'react'
import { View } from 'react-native'
import {
  Flex
  // Heatmap
} from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { findSubjectCn } from '@utils/app'
import { IMG_DEFAULT_AVATAR } from '@constants'
import Avatar from './avatar'
import Content from './content'
import BtnPopover from './btn-popover'
import IconFavor from './icon-favor'

const LIMIT_HEAVY = _.device(10, 20)
const AD_REPLIES_COUNT = 4 // 回复数少于的数字, 判断为广告姬
const defaultProps = {
  styles: {},
  avatar: '',
  userId: '',
  userName: '',
  group: '',
  groupHref: '',
  groupCn: '',
  href: '',
  title: '',
  time: '',
  topicId: '',
  replyCount: '',
  isReaded: false,
  isGroup: false
}

const Item = memo(
  ({
    styles,
    avatar,
    userId,
    userName,
    group,
    groupHref,
    groupCn,
    href,
    title,
    time,
    topicId,
    replyCount,
    isReaded,
    isGroup
  }) => {
    rerender('Rakuen.Item.Main')

    return (
      <View
        style={[_.container.item, styles.container, isReaded && styles.readed]}
      >
        <Flex align='start'>
          <Avatar avatar={avatar} userName={userName} userId={userId} />
          <Flex.Item style={styles.wrap}>
            <Flex align='start'>
              <Flex.Item>
                <Content
                  avatar={avatar}
                  group={group}
                  groupCn={groupCn}
                  href={href}
                  title={title}
                  time={time}
                  topicId={topicId}
                  replyCount={replyCount}
                  userId={userId}
                  userName={userName}
                  isReaded={isReaded}
                  isGroup={isGroup}
                />
              </Flex.Item>
              <BtnPopover
                groupCn={groupCn}
                groupHref={groupHref}
                href={href}
                topicId={topicId}
                userId={userId}
                userName={userName}
                isGroup={isGroup}
              />
            </Flex>
          </Flex.Item>
        </Flex>
        <IconFavor topicId={topicId} />
        {/* <Heatmap
          id='超展开.跳转'
          data={{
            to: 'Topic',
            alias: '帖子'
          }}
        /> */}
      </View>
    )
  },
  defaultProps,
  true
)

export default obc(
  (
    { index, avatar, userName, group, groupHref, href, title, time, replies },
    { $ }
  ) => {
    rerender('Rakuen.Item')

    const { _mounted } = $.state
    if (index >= LIMIT_HEAVY && !_mounted) {
      return (
        <View
          style={{
            height: 74
          }}
        />
      )
    }

    const { blockGroups, blockUserIds, isBlockDefaultUser } = $.setting
    const groupCn = findSubjectCn(group)
    const userId = getUserId(avatar)
    const replyCount = getReplyCount(replies)
    if (
      getIsBlockGroup(blockGroups, groupCn) ||
      getIsBlockUser(blockUserIds, userName, userId) ||
      getIsAd(isBlockDefaultUser, avatar, replyCount)
    ) {
      return null
    }

    const topicId = getTopicId(href)
    return (
      <Item
        styles={memoStyles()}
        avatar={avatar}
        userId={userId}
        userName={userName}
        group={group}
        groupHref={groupHref}
        groupCn={groupCn}
        href={href}
        title={title}
        time={time}
        topicId={topicId}
        replyCount={replyCount}
        isReaded={!!$.readed(topicId).time}
        isGroup={getIsGroup(topicId)}
      />
    )
  }
)

// 处理屏蔽小组
function getIsBlockGroup(blockGroups, group) {
  return blockGroups.includes(group)
}

// 处理屏蔽用户
function getIsBlockUser(blockUserIds, userName, userId) {
  const findIndex = blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (itemUserId === 'undefined') return itemUserName === userName
    return itemUserId === userId
  })
  return findIndex !== -1
}

// 设置开启屏蔽默认头像, 且回复数小于4, 鉴定为广告姬
function getIsAd(isBlockDefaultUser, avatar, replyCount) {
  return (
    isBlockDefaultUser &&
    avatar === IMG_DEFAULT_AVATAR &&
    replyCount < AD_REPLIES_COUNT
  )
}

// 匹配userId, 有userId的头像可以跳转到用户空间
function getUserId(avatar) {
  let userId
  const match = avatar?.match(/\/(\d+).jpg/)
  if (match) userId = match[1]
  return userId
}

// 帖子Id
function getTopicId(href = '') {
  return href.replace('/rakuen/topic/', '')
}

// 回复数
function getReplyCount(replies = '') {
  return parseInt(replies?.match(/\d+/g))
}

// 是否小组
function getIsGroup(topicId = '') {
  return topicId?.includes('group/')
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  wrap: {
    paddingRight: _.wind - _._wind
  }
}))
