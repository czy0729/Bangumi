/* eslint-disable no-restricted-globals */
/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-23 03:54:55
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
        <Text style={styles.id} type={_.select('plain', 'title')} size={13}>
          {join || '- 加入'}
        </Text>
        <Text
          style={styles.percent}
          type={_.select('plain', 'title')}
          size={13}
        >
          同步率{isNaN(percent) ? '-' : percent}%
        </Text>
        {isFriend && (
          <Text
            style={styles.friend}
            type={_.select('plain', 'title')}
            size={13}
          >
            是我的好友
          </Text>
        )}
        <Touchable style={styles.collect} onPress={() => $.toUser(navigation)}>
          <Text type={_.select('plain', 'title')} size={13}>
            [TA的收藏]
          </Text>
        </Touchable>
        <Touchable
          style={styles.pm}
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
          <Touchable style={styles.connect} onPress={$.doConnectFriend}>
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
    borderColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 88,
    overflow: 'hidden'
  },
  id: {
    position: 'absolute',
    top: 20,
    right: 92,
    opacity: 0.88
  },
  percent: {
    position: 'absolute',
    top: 50,
    right: 104,
    opacity: 0.88
  },
  friend: {
    position: 'absolute',
    top: 80,
    right: 92,
    opacity: 0.88
  },
  collect: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 92,
    opacity: 0.88
  },
  pm: {
    position: 'absolute',
    zIndex: 1,
    top: 50,
    left: 104,
    opacity: 0.88
  },
  connect: {
    position: 'absolute',
    zIndex: 1,
    top: 80,
    left: 92,
    opacity: 0.88
  }
}))
