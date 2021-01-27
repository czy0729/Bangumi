/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:56:28
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

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
              onPress={() => navigation.push('Characters')}
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
      <Text style={_.mt.md} type={_.select('plain', 'title')} size={16}>
        {nickname}
        <Text
          style={styles.id}
          type={_.select('plain', 'title')}
          lineHeight={16}
        >
          {' '}
          {id ? `@${id} ` : ''}
        </Text>
      </Text>
    </Flex>
  )
}

export default obc(Head)

const styles = _.create({
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
