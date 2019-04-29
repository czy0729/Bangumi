/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 16:17:48
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Touchable } from '@components'
import _, { md, wind, colorPlain, colorBorder } from '@styles'

const ArticleItem = ({
  style,
  isFirst,
  avatar,
  title,
  replies,
  group,
  time,
  onPress
}) => (
  <Touchable style={[styles.container, style]} highlight onPress={onPress}>
    <Flex align='start'>
      <Image
        style={styles.image}
        size={28}
        src={avatar}
        radius
        border={colorBorder}
      />
      <Flex.Item style={[styles.item, !isFirst && styles.border, _.ml.sm]}>
        <Text size={16}>
          {title}
          <Text type='main' size={12} lineHeight={16}>
            {' '}
            {replies}
          </Text>
        </Text>
        <Text style={_.mt.xs} type='sub' size={12}>
          {time.replace('...', '').replace('sago', 's ago')}
          {group ? ' / ' : ''}
          <Text size={12}>{group}</Text>
        </Text>
      </Flex.Item>
    </Flex>
  </Touchable>
)

export default observer(ArticleItem)

const styles = StyleSheet.create({
  container: {
    paddingLeft: wind,
    backgroundColor: colorPlain
  },
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
