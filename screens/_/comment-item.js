/*
 * @Author: czy0729
 * @Date: 2019-04-10 22:40:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-12 12:43:33
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image } from '@components'
import { HTMLDecode } from '@utils'
import _, { md, wind, colorPlain, colorBorder } from '@styles'
import Stars from './stars'

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

const CommentItem = ({
  style,
  isTop,
  time,
  avatar,
  username,
  star,
  comment
}) => (
  <Flex style={[styles.item, style]} align='start'>
    <Image
      style={styles.image}
      size={28}
      src={`https:${avatar}`}
      radius
      border={colorBorder}
    />
    <Flex.Item style={[styles.content, !isTop && styles.border, _.ml.sm]}>
      <Flex>
        <Flex.Item>
          <Flex>
            <Text size={12}>{HTMLDecode(username)}</Text>
            <Text style={_.ml.xs} type='sub' size={12}>
              / {formatTime(time)}
            </Text>
          </Flex>
        </Flex.Item>
        <Stars value={star} />
      </Flex>
      <Text style={_.mt.xs} size={15} lineHeight={20}>
        {HTMLDecode(comment)}
      </Text>
    </Flex.Item>
  </Flex>
)

export default observer(CommentItem)

const styles = StyleSheet.create({
  item: {
    backgroundColor: colorPlain
  },
  image: {
    marginTop: md,
    marginLeft: wind
  },
  content: {
    paddingVertical: md,
    paddingRight: wind
  },
  border: {
    borderTopColor: colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
