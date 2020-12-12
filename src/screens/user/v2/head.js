/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-10 19:27:03
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text, Touchable } from '@components'
import { t } from '@utils/fetch'
import { _ } from '@stores'

function Head({ style }, { $, navigation }) {
  const { avatar = {}, nickname, id, username } = $.usersInfo
  const { userId } = $.params
  const isMe = !userId || userId === $.myUserId
  const src = $.avatar || avatar.large
  return (
    <Flex style={style} justify='center' direction='column'>
      <View>
        <Image
          style={_.mt.md}
          key={src}
          size={88}
          radius={44}
          border={_.__colorPlain__}
          borderWidth={2}
          shadow
          src={src}
          onPress={() => {
            t('我的.跳转', {
              to: 'UserSetting'
            })

            navigation.push('UserSetting')
          }}
        />
        {isMe && (
          <>
            <Touchable
              style={styles.r1}
              onPress={() => navigation.push('Friends')}
            >
              <View>
                <Text type={_.select('plain', 'title')} size={11}>
                  好友
                </Text>
              </View>
            </Touchable>
            <Touchable
              style={styles.r2}
              onPress={() => navigation.push('Character')}
            >
              <Text type={_.select('plain', 'title')} size={11}>
                人物
              </Text>
            </Touchable>
            <Touchable
              style={styles.r3}
              onPress={() => navigation.push('Catalogs')}
            >
              <Text type={_.select('plain', 'title')} size={11}>
                目录
              </Text>
            </Touchable>
          </>
        )}
      </View>
      <Text style={_.mt.md} type={_.select('plain', 'title')}>
        {nickname}
        <Text type={_.select('plain', 'title')}>
          {' '}
          {username || id ? `@${username || id} ` : ''}
        </Text>
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
  userSetting: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    right: 100,
    opacity: 0.8
  },
  l1: {
    position: 'absolute',
    top: 16,
    right: 100,
    opacity: 0.8
  },
  l2: {
    position: 'absolute',
    top: 52,
    right: 116,
    opacity: 0.8
  },
  l3: {
    position: 'absolute',
    top: 88,
    right: 100,
    opacity: 0.8
  },
  r1: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    left: 100,
    opacity: 0.8
  },
  r2: {
    position: 'absolute',
    zIndex: 1,
    top: 52,
    left: 116,
    opacity: 0.8
  },
  r3: {
    position: 'absolute',
    zIndex: 1,
    top: 88,
    left: 100,
    opacity: 0.8
  }
})
