/* eslint-disable no-restricted-globals */
/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-10 15:40:33
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'

function Head({ style }, { $, navigation }) {
  const { _id, _name } = $.params
  const { nickname, id, username } = $.usersInfo
  const { join, percent, disconnectUrl } = $.users
  const isFriend = !!disconnectUrl
  const userId = id || _id
  const userName = HTMLDecode(nickname || _name)
  return (
    <Flex style={style} justify='center' direction='column'>
      <View>
        <Image
          style={_.mt.md}
          size={88}
          radius={44}
          border={_.__colorPlain__}
          borderWidth={2}
          shadow
          src={$.src}
        />
        <Text style={styles.l1} type={_.select('plain', 'title')} size={12}>
          {join || '- 加入'}
        </Text>
        <Text style={styles.l2} type={_.select('plain', 'title')} size={12}>
          同步率{isNaN(percent) ? '-' : percent}%
        </Text>
        <Touchable
          style={styles.l3}
          onPress={() => {
            t('空间.历史', {
              userId: $.userId
            })

            $.openUsedModal()
          }}
        >
          <Text type={_.select('plain', 'title')} size={12}>
            历史
          </Text>
        </Touchable>
        <Touchable
          style={styles.r1}
          onPress={() => {
            t('空间.跳转', {
              userId: $.userId,
              to: 'Character'
            })

            navigation.push('Character', {
              userName: $.userId
            })
          }}
        >
          <Text type={_.select('plain', 'title')} size={12}>
            人物
          </Text>
        </Touchable>
        <Touchable
          style={styles.r2}
          onPress={() => {
            t('空间.跳转', {
              userId: $.userId,
              to: 'Blogs'
            })

            navigation.push('Blogs', {
              userId: $.userId
            })
          }}
        >
          <Text type={_.select('plain', 'title')} size={12}>
            日志
          </Text>
        </Touchable>
        <Touchable
          style={styles.r3}
          onPress={() => {
            t('空间.跳转', {
              userId: $.userId,
              to: 'Catalogs'
            })

            navigation.push('Catalogs', {
              userId: $.userId
            })
          }}
        >
          <Text type={_.select('plain', 'title')} size={12}>
            目录
          </Text>
        </Touchable>
      </View>
      <Text style={_.mt.md} type={_.select('plain', 'title')}>
        {userName}
        {!!(username || userId) && (
          <Text type={_.select('plain', 'title')}> @{username || userId}</Text>
        )}
        {isFriend && (
          <Text
            style={styles.friend}
            type={_.select('plain', 'title')}
            size={12}
            lineHeight={14}
          >
            {' '}
            [好友]
          </Text>
        )}
      </Text>
    </Flex>
  )
}

Head.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Head)

const styles = StyleSheet.create({
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
  },
  friend: {
    opacity: 0.72
  }
})
