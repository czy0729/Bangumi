/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-14 17:40:57
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { _, systemStore } from '@stores'

const avatarSize = 88 * _.ratio

function Head({ style }, { $, navigation }) {
  rerender('User.Head')

  const { avatar = {}, nickname, id, username } = $.usersInfo
  const { userId } = $.params
  const isMe = !userId || userId === $.myUserId
  const src = $.avatar || avatar.large
  const showAdvance = isMe && systemStore.advance
  return (
    <Flex style={style} justify='center' direction='column'>
      <View>
        <View style={_.mt.md}>
          <Image
            style={styles.avatar}
            key={src}
            size={avatarSize}
            radius={avatarSize / 2}
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
            <View style={styles.r1}>
              <Touchable
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
              </Touchable>
              <Heatmap
                right={-32}
                id='我的.跳转'
                data={{
                  to: 'Friends',
                  alias: '好友'
                }}
              />
            </View>
            <View style={styles.r2}>
              <Touchable
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
              </Touchable>
              <Heatmap
                right={-32}
                id='我的.跳转'
                data={{
                  to: 'Character',
                  alias: '角色'
                }}
              />
            </View>
            <View style={styles.r3}>
              <Touchable
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
              </Touchable>
              <Heatmap
                right={-32}
                id='我的.跳转'
                data={{
                  to: 'Catalogs',
                  alias: '目录'
                }}
              />
            </View>
          </>
        )}
      </View>
      <Flex style={[_.mt.md, showAdvance && styles.advanceContainer]}>
        <Text type={_.select('plain', 'title')}>
          {nickname}
          <Text type={_.select('plain', 'title')}>
            {' '}
            {username || id ? `@${username || id} ` : ''}
          </Text>
        </Text>
        {showAdvance && (
          <IconTouchable
            style={styles.advance}
            color={_.__colorPlain__}
            size={16}
            name='md-star'
            onPress={() => info('您是高级会员')}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default obc(Head)

const rStyle = (top, left) => ({
  position: 'absolute',
  zIndex: 1,
  top: (top - _.xs) * _.ratio + _.device(0, 4),
  left: (left - _.sm) * _.ratio,
  paddingVertical: _.xs,
  paddingHorizontal: _.sm,
  borderRadius: _.radiusSm,
  overflow: 'hidden',
  opacity: 0.8
})

const styles = _.create({
  avatar: {
    backgroundColor: _.__colorPlain__
  },
  r1: rStyle(16, 100),
  r2: rStyle(52, 116),
  r3: rStyle(88, 100),
  advanceContainer: {
    paddingLeft: _.sm * 2
  },
  advance: {
    padding: 0,
    paddingLeft: 2,
    opacity: 0.64
  }
})
