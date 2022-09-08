/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-08 16:54:19
 */
import React from 'react'
import { Flex, Text, UserStatus } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { correctAgo } from '@utils/app'
import { Avatar, Stars, Name } from '../../base'
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
    comment,
    event
  }) => {
    global.rerender('Item.ItemComment.Main', userName)

    return (
      <Flex style={[styles.item, style]} align='start'>
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
        <Flex.Item style={[styles.content, _.ml.sm]}>
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
                    {correctAgo(formatTime(time))}
                  </Text>
                }
              >
                {userName}
              </Name>
            </Flex.Item>
          </Flex>
          <Stars style={[_.mt.xs, _.mb.xs]} value={star} />
          <Text style={_.mt.xs} size={15} lineHeight={20} selectable>
            {comment}
          </Text>
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS
)

export default Item

/**
 * 由于爬出的html做了去除空格操作
 * 还原本来有操作的时间字符串
 * @param {*} str
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
