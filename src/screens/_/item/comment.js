/*
 * @Author: czy0729
 * @Date: 2021-08-18 07:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-09 12:35:43
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { memo, ob } from '@utils/decorators'
import { correctAgo } from '@utils/app'
import { EVENT } from '@constants'
import { Avatar, Stars, Name } from '../base'

const defaultProps = {
  navigation: {},
  styles: {},
  style: {},
  time: '',
  avatar: '',
  userId: '',
  userName: '',
  star: '',
  comment: '',
  event: EVENT
}

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
    rerender('Item.ItemComment.Main', userName)
    return (
      <Flex style={[styles.item, style]} align='start'>
        <Avatar
          navigation={navigation}
          style={styles.image}
          userId={userId}
          name={userName}
          src={avatar}
          event={event}
        />
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
  },
  defaultProps
)

export const ItemComment = ob(
  ({ navigation, style, time, avatar, userId, userName, star, comment, event }) => (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      style={style}
      time={time}
      avatar={avatar}
      userId={userId}
      userName={userName}
      star={star}
      comment={comment}
      event={event}
    />
  )
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
  return str.replace('d', 'd ').replace('h', 'h ').replace('m', 'm ').replace('s', 's ')
}
