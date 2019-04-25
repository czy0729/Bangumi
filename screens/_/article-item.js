/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 11:27:48
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Touchable } from '@components'
import { date } from '@utils'
import { HTMLDecode } from '@utils/html'
import _, { md, wind, colorBorder } from '@styles'

const ArticleItem = ({
  style,
  isFirst,
  avatar,
  title,
  summary,
  nickname,
  timestamp,
  replies,
  onPress,
  onAvatarPress
}) => (
  <Touchable style={style} highlight onPress={onPress}>
    <Flex align='start'>
      <Image
        style={styles.image}
        size={28}
        src={avatar}
        radius
        border={colorBorder}
        onPress={onAvatarPress}
      />
      <Flex.Item style={[styles.item, !isFirst && styles.border, _.ml.sm]}>
        <Text size={16}>{title}</Text>
        <Flex style={_.mt.xs}>
          <Text type='sub' size={12}>
            by
          </Text>
          <Text style={_.ml.xs} size={12}>
            {HTMLDecode(nickname)}
          </Text>
          <Text type='sub' style={_.ml.xs} size={12}>
            / {date('Y-m-d', timestamp)} / {replies} replies
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

export default observer(ArticleItem)

const styles = StyleSheet.create({
  image: {
    marginTop: md
  },
  item: {
    paddingVertical: md,
    paddingRight: wind
  },
  border: {
    borderTopColor: colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
