/*
 * @Author: czy0729
 * @Date: 2019-08-08 09:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 10:27:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { appNavigate } from '@utils/app'
import _ from '@styles'
import Avatar from '../base/avatar'

function ItemNotify({
  navigation,
  index,
  avatar,
  userId,
  userName,
  title,
  message,
  message2,
  href
}) {
  return (
    <Flex style={styles.container} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        src={avatar}
        userId={userId}
      />
      <Flex.Item style={[styles.item, !!index && styles.border, _.ml.sm]}>
        <Text size={13} type='avatar'>
          {userName}
        </Text>
        <Text style={_.mt.xs} lineHeight={1.8}>
          {message}
          <Text
            lineHeight={1.8}
            type='main'
            onPress={() => appNavigate(href, navigation)}
          >
            {title}
          </Text>
          {message2}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default observer(ItemNotify)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
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
