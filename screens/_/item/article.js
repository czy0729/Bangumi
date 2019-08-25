/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 18:35:34
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { date } from '@utils'
import { appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import _ from '@styles'
import Avatar from '../base/avatar'

function ItemArticle({
  navigation,
  style,
  index,
  avatar,
  title,
  summary,
  nickname,
  timestamp,
  replies,
  url
}) {
  const isFirst = index === 0
  return (
    <Touchable
      style={[styles.container, style]}
      highlight
      onPress={() => appNavigate(url, navigation)}
    >
      <Flex align='start'>
        <Avatar style={styles.image} src={avatar} />
        <Flex.Item style={[styles.item, !isFirst && styles.border, _.ml.sm]}>
          <Text size={16}>{HTMLDecode(title)}</Text>
          <Flex style={_.mt.xs}>
            <Text type='sub' size={12}>
              by
            </Text>
            <Text style={_.ml.xs} size={12}>
              {HTMLDecode(nickname)}
            </Text>
            <Text type='sub' style={_.ml.xs} size={12}>
              / {date('y-m-d', timestamp)} / {replies} replies
            </Text>
          </Flex>
          {!!summary && (
            <Text style={_.mt.sm} size={15} lineHeight={20} numberOfLines={4}>
              {HTMLDecode(summary)}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default observer(ItemArticle)

const styles = StyleSheet.create({
  container: {
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
