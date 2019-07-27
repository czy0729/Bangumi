/*
 * @Author: czy0729
 * @Date: 2019-04-10 22:40:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-27 15:55:03
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import _ from '@styles'
import Avatar from '../base/avatar'
import Stars from '../base/stars'

const ItemComment = ({
  style,
  navigation,
  index,
  time,
  avatar,
  userId,
  userName,
  star,
  comment
}) => {
  const isTop = index === 0
  return (
    <Flex style={[styles.item, style]} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        userId={userId}
        src={avatar}
      />
      <Flex.Item style={[styles.content, !isTop && styles.border, _.ml.sm]}>
        <Flex>
          <Flex.Item>
            <Flex>
              <Text size={12}>{userName}</Text>
              <Text style={_.ml.xs} type='sub' size={12}>
                / {formatTime(time)}
              </Text>
            </Flex>
          </Flex.Item>
          <Stars value={star} />
        </Flex>
        <Text style={_.mt.xs} size={15} lineHeight={20}>
          {comment}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default observer(ItemComment)

const styles = StyleSheet.create({
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
    borderTopWidth: StyleSheet.hairlineWidth
  }
})

/**
 * 由于爬出的html做了去除空格操作
 * 还原本来有操作的时间字符串
 * @param {*} str
 */
function formatTime(str = '') {
  if (str.indexOf('ago') === -1) {
    // date
    const { length } = str
    return `${str.slice(0, length - 5)} ${str.slice(length - 5, length)}`
  }

  // ago
  return str
    .replace('d', 'd ')
    .replace('h', 'h ')
    .replace('m', 'm ')
    .replace('s', 's ')
}
