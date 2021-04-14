/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:55:08
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable, Heatmap } from '@components'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { _ } from '@stores'

function Head({ style }, { $, navigation }) {
  const { avatar = {}, nickname, id, username } = $.usersInfo
  const { userId } = $.params
  const isMe = !userId || userId === $.myUserId
  const src = $.avatar || avatar.large
  return (
    <Flex style={style} justify='center' direction='column'>
      <View>
        <View style={_.mt.md}>
          <Image
            style={styles.avatar}
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
          <Heatmap
            id='我的.跳转'
            data={{
              to: 'UserSetting',
              alias: '个人设置'
            }}
          />
        </View>
        {isMe && (
          <>
            <Touchable
              style={styles.r1}
              onPress={() => {
                t('我的.跳转', {
                  to: 'Friends'
                })

                navigation.push('Friends')
              }}
            >
              <Text type={_.select('plain', 'title')} size={11}>
                好友
              </Text>
              <Heatmap
                right={-32}
                id='我的.跳转'
                data={{
                  to: 'Friends',
                  alias: '好友'
                }}
              />
            </Touchable>
            <Touchable
              style={styles.r2}
              onPress={() => {
                t('我的.跳转', {
                  to: 'Character'
                })

                navigation.push('Character')
              }}
            >
              <Text type={_.select('plain', 'title')} size={11}>
                人物
              </Text>
              <Heatmap
                right={-32}
                id='我的.跳转'
                data={{
                  to: 'Character',
                  alias: '角色'
                }}
              />
            </Touchable>
            <Touchable
              style={styles.r3}
              onPress={() => {
                t('我的.跳转', {
                  to: 'Catalogs'
                })

                navigation.push('Catalogs')
              }}
            >
              <Text type={_.select('plain', 'title')} size={11}>
                目录
              </Text>
              <Heatmap
                right={-32}
                id='我的.跳转'
                data={{
                  to: 'Catalogs',
                  alias: '目录'
                }}
              />
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

export default obc(Head)

const styles = _.create({
  userSetting: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    right: 100,
    opacity: 0.88
  },
  avatar: {
    backgroundColor: _.__colorPlain__
  },
  l1: {
    position: 'absolute',
    top: 16,
    right: 100,
    opacity: 0.88
  },
  l2: {
    position: 'absolute',
    top: 52,
    right: 116,
    opacity: 0.88
  },
  l3: {
    position: 'absolute',
    top: 88,
    right: 100,
    opacity: 0.88
  },
  r1: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    left: 100,
    opacity: 0.88
  },
  r2: {
    position: 'absolute',
    zIndex: 1,
    top: 52,
    left: 116,
    opacity: 0.88
  },
  r3: {
    position: 'absolute',
    zIndex: 1,
    top: 88,
    left: 100,
    opacity: 0.88
  }
})
