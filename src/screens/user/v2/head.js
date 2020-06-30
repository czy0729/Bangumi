/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-30 20:45:18
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text, Touchable } from '@components'
import { _ } from '@stores'

function Head({ style }, { $, navigation }) {
  const { avatar = {}, nickname, id } = $.usersInfo
  const { userId } = $.params
  const isMe = !userId || userId === $.myUserId
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
          src={$.avatar || avatar.large}
        />
        {isMe && (
          <>
            <Touchable
              style={styles.r1}
              onPress={() => navigation.push('Friends')}
            >
              <View>
                <Text type={_.select('plain', 'title')} size={13}>
                  好友
                </Text>
              </View>
            </Touchable>
            <Touchable
              style={styles.r2}
              onPress={() => navigation.push('Character')}
            >
              <Text type={_.select('plain', 'title')} size={13}>
                人物
              </Text>
            </Touchable>
            <Touchable
              style={styles.r3}
              onPress={() => navigation.push('Catalogs')}
            >
              <Text type={_.select('plain', 'title')} size={13}>
                目录
              </Text>
            </Touchable>
          </>
        )}
      </View>
      <Text style={_.mt.md} type={_.select('plain', 'title')}>
        {nickname}
        <Text
          style={styles.id}
          type={_.select('plain', 'title')}
          size={13}
          lineHeight={16}
        >
          {' '}
          {id ? `@${id}` : ''}
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
