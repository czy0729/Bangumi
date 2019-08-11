/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 20:39:10
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import _, { colorPlain } from '@styles'

function Head({ style }, { $ }) {
  const { avatar = {}, nickname, id } = $.usersInfo
  const { join, percent, disconnectUrl } = $.users
  const isFriend = !!disconnectUrl
  return (
    <Flex style={style} justify='center' direction='column'>
      <View>
        <Image style={[styles.avatar, _.mt.md]} size={80} src={avatar.large} />
        <Text style={styles.id} type='plain' size={12}>
          {join || '- 加入'}
        </Text>
        <Text style={styles.percent} type='plain' size={12}>
          同步率{percent}%
        </Text>
        {isFriend && (
          <Text style={styles.friend} type='plain' size={12}>
            是我的好友
          </Text>
        )}
      </View>
      <Text style={_.mt.md} type='plain' size={16}>
        {nickname}
        {!!id && ` @${id}`}
      </Text>
    </Flex>
  )
}

Head.contextTypes = {
  $: PropTypes.object
}

export default observer(Head)

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: colorPlain,
    borderRadius: 80,
    overflow: 'hidden'
  },
  id: {
    position: 'absolute',
    top: 20,
    left: 92,
    opacity: 0.88
  },
  percent: {
    position: 'absolute',
    top: 50,
    left: 104,
    opacity: 0.88
  },
  friend: {
    position: 'absolute',
    top: 80,
    left: 92,
    opacity: 0.88
  }
})
