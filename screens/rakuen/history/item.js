/*
 * @Author: czy0729
 * @Date: 2019-11-28 17:16:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-28 23:04:37
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Avatar } from '@screens/_'
import _ from '@styles'

function Item(
  { index, topicId, avatar, userName, title, group, time = '', userId },
  { $, navigation }
) {
  return (
    <Flex style={styles.container} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        src={avatar}
        userId={userId}
      />
      <Flex.Item style={index !== 0 && styles.border}>
        <Touchable
          style={styles.item}
          highlight
          onPress={() =>
            navigation.push('Topic', {
              topicId,
              _noFetch: true,
              _title: title,
              _group: group,
              _time: time,
              _avatar: avatar,
              _userName: userName,
              _userId: userId
            })
          }
        >
          <Flex align='start'>
            <Flex.Item>
              <Text size={16}>{title}</Text>
              <Text style={_.mt.sm} type='sub' size={12}>
                {time.split(' ')[1]} / <Text size={12}>{group}</Text> /{' '}
                {userName}
              </Text>
            </Flex.Item>
            {$.isFavor(topicId) && (
              <Iconfont
                style={[
                  styles.favor,
                  {
                    marginTop: 2
                  }
                ]}
                size={16}
                name='star-full'
                color={_.colorYellow}
              />
            )}
          </Flex>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingLeft: _.sm,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
