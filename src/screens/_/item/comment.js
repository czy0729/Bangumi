/*
 * @Author: czy0729
 * @Date: 2019-04-10 22:40:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 20:05:53
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { correctAgo } from '@utils/app'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar, Stars, Name } from '../base'

export const ItemComment = ob(
  ({
    style,
    navigation,
    index,
    time,
    avatar,
    userId,
    userName,
    star,
    comment,
    event = EVENT
  }) => {
    const styles = memoStyles()
    const isTop = index === 0
    return (
      <Flex style={[styles.item, style]} align='start'>
        <Avatar
          style={styles.image}
          navigation={navigation}
          userId={userId}
          name={userName}
          src={avatar}
          event={event}
        />
        <Flex.Item
          style={[styles.content, !isTop && !_.flat && styles.border, _.ml.sm]}
        >
          <Flex>
            <Flex.Item>
              <Name
                userId={userId}
                showFriend
                size={14}
                bold
                right={
                  <Text type='sub' size={11} lineHeight={14}>
                    {' '}
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
  }
)

const memoStyles = _.memoStyles(_ => ({
  item: {
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))

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
  return str
    .replace('d', 'd ')
    .replace('h', 'h ')
    .replace('m', 'm ')
    .replace('s', 's ')
}
