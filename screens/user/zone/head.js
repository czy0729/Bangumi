/* eslint-disable no-restricted-globals */
/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-22 00:11:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'

function Head({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { _id, _name, _image } = $.params
  const { avatar = {}, nickname, id } = $.usersInfo
  const { join, percent, disconnectUrl } = $.users
  const isFriend = !!disconnectUrl
  const userId = id || _id
  const userName = HTMLDecode(nickname || _name)
  return (
    <Flex style={style} justify='center' direction='column'>
      <View>
        <Image
          style={[styles.avatar, _.mt.md]}
          size={88}
          src={avatar.large || _image}
        />
        <Text style={styles.l1} type={_.select('plain', 'title')} size={13}>
          {join || '- 加入'}
        </Text>
        <Text style={styles.l2} type={_.select('plain', 'title')} size={13}>
          同步率{isNaN(percent) ? '-' : percent}%
        </Text>
        {isFriend && (
          <Text style={styles.l3} type={_.select('plain', 'title')} size={13}>
            是我的好友
          </Text>
        )}
        <Touchable style={styles.r1} onPress={() => $.toUser(navigation)}>
          <Text type={_.select('plain', 'title')} size={13}>
            [TA的收藏]
          </Text>
        </Touchable>
        <Touchable
          style={styles.r2}
          onPress={() =>
            navigation.push('PM', {
              userId,
              userName
            })
          }
        >
          <Text type={_.select('plain', 'title')} size={13}>
            [发短信]
          </Text>
        </Touchable>
        {!!$.users.connectUrl && (
          <Touchable style={styles.r3} onPress={$.doConnectFriend}>
            <Text type={_.select('plain', 'title')} size={13}>
              [加好友]
            </Text>
          </Touchable>
        )}
      </View>
      <Text style={_.mt.md} type={_.select('plain', 'title')} size={16}>
        {userName}
        {!!userId && ` @${userId}`}
      </Text>
    </Flex>
  )
}

Head.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Head)

const memoStyles = _.memoStyles(_ => ({
  avatar: {
    borderWidth: 2,
    borderColor: _.__colorPlain__,
    borderRadius: 88,
    overflow: 'hidden'
  },
  l1: {
    position: 'absolute',
    top: 16,
    right: 100,
    opacity: 0.72
  },
  l2: {
    position: 'absolute',
    top: 52,
    right: 116,
    opacity: 0.72
  },
  l3: {
    position: 'absolute',
    top: 88,
    right: 100,
    opacity: 0.72
  },
  r1: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    left: 100,
    opacity: 0.72
  },
  r2: {
    position: 'absolute',
    zIndex: 1,
    top: 52,
    left: 116,
    opacity: 0.72
  },
  r3: {
    position: 'absolute',
    zIndex: 1,
    top: 88,
    left: 100,
    opacity: 0.72
  }
}))
