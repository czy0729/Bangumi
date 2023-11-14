/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 21:34:46
 */
import React from 'react'
import { Flex, Iconfont, Text, UserStatus } from '@components'
import { _, userStore, uiStore } from '@stores'
import { stl, correctAgo } from '@utils'
import { memo } from '@utils/decorators'
import { LIKE_TYPE_TIMELINE, STORYBOOK } from '@constants'
import { Popover, Avatar, Stars, Name, Likes } from '../../base'
import { DEFAULT_PROPS } from './ds'

const Item = memo(
  ({
    navigation,
    styles,
    style,
    time,
    avatar,
    userId,
    userName,
    star,
    status,
    comment,
    subjectId,
    relatedId,
    event,
    popoverData,
    onSelect
  }) => {
    // global.rerender('Item.ItemComment.Main', userName)

    return (
      <Flex style={stl(styles.item, style)} align='start'>
        <UserStatus userId={userId}>
          <Avatar
            navigation={navigation}
            style={styles.image}
            userId={userId}
            name={userName}
            src={avatar}
            event={event}
          />
        </UserStatus>
        <Flex.Item style={styles.content}>
          <Flex>
            <Flex.Item>
              <Name
                userId={userId}
                showFriend
                size={14}
                bold
                right={
                  <Text type='sub' size={11} lineHeight={14}>
                    {'  '}
                    {String(time).includes('ago') ? correctAgo(formatTime(time)) : time}
                  </Text>
                }
              >
                {userName}
              </Name>
            </Flex.Item>
            {!!popoverData && typeof onSelect === 'function' && (
              <Popover
                key={userId}
                style={styles.touch}
                data={popoverData}
                onSelect={title => {
                  onSelect(
                    title,
                    {
                      avatar,
                      userId,
                      userName
                    },
                    comment,
                    relatedId
                  )
                }}
              >
                <Flex style={styles.icon} justify='center'>
                  <Iconfont style={_.ml.md} name='md-more-vert' size={18} />
                </Flex>
              </Popover>
            )}
          </Flex>
          {!!(star || status) && (
            <Flex style={styles.stars}>
              <Stars value={star} />
              {!!status && (
                <Text type='sub' size={11}>
                  {!!star && ' · '}
                  {status}
                </Text>
              )}
            </Flex>
          )}
          {!!comment && (
            <Text style={_.mt.xs} lineHeight={18} selectable={STORYBOOK}>
              {comment}
            </Text>
          )}
          <Likes
            topicId={subjectId}
            id={relatedId}
            likeType={LIKE_TYPE_TIMELINE}
            formhash={userStore.formhash}
            onLongPress={uiStore.showLikesUsers}
          />
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS
)

export default Item

/**
 * 由于爬出的 html 做了去除空格操作
 * 还原本来有操作的时间字符串
 */
function formatTime(str = '') {
  if (str.indexOf('ago') === -1) {
    // date
    const { length } = str
    return `${str.slice(2, length - 5)} ${str.slice(length - 5, length)}`
  }

  // ago
  return str.replace('d', 'd ').replace('h', 'h ').replace('m', 'm ').replace('s', 's ')
}
