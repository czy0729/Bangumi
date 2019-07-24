/*
 * @Author: czy0729
 * @Date: 2019-07-24 13:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-24 14:55:40
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Touchable } from '@components'
import _ from '@styles'

const ItemFriends = ({ navigation, index, avatar, userId, userName }) => {
  const isFirst = index === 0
  return (
    <Touchable
      style={styles.container}
      highlight
      onPress={() =>
        navigation.push('Zone', {
          userId
        })
      }
    >
      <Flex>
        <Image
          style={styles.image}
          size={32}
          src={avatar}
          radius
          border={_.colorBorder}
        />
        <Flex.Item style={[styles.item, !isFirst && styles.border, _.ml.sm]}>
          <Text size={16}>{userName}</Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default observer(ItemFriends)

const styles = StyleSheet.create({
  container: {
    backgroundColor: _.colorPlain
  },
  image: {
    marginLeft: _.wind
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
