/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 13:12:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { info } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { _, systemStore } from '@stores'
import { Ctx } from '../types'
import { styles } from './styles'

const avatarSize = _.r(88)

function Head({ style }, { $, navigation }: Ctx) {
  global.rerender('User.Head')

  const { avatar, nickname, id, username } = $.usersInfo
  const { userId } = $.params
  const isMe = !userId || userId === $.myUserId
  const src = $.avatar || avatar?.large
  const showAdvance = isMe && systemStore.advance
  const fallback = typeof src === 'string' && !src.includes('//lain.bgm.tv/pic/user/l/')
  return (
    <Flex style={style} justify='center' direction='column'>
      <View>
        <View style={_.mt.md}>
          <Image
            style={styles.avatar}
            key={src}
            src={src}
            size={avatarSize}
            radius={avatarSize / 2}
            border={styles.avatar.backgroundColor}
            borderWidth={2}
            shadow
            fallback={fallback}
            onPress={() => {
              t('我的.跳转', {
                to: 'UserSetting'
              })

              navigation.push('UserSetting')
            }}
          />
          <Heatmap id='我的.跳转' to='UserSetting' alias='个人设置' />
        </View>
        {/* {isMe && (
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
              <Heatmap right={-32} id='我的.跳转' to='Friends' alias='好友' />
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
              <Heatmap right={-32} id='我的.跳转' to='Character' alias='角色' />
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
              <Heatmap right={-32} id='我的.跳转' to='Catalogs' alias='目录' />
            </View>
          </>
        )} */}
      </View>
      <Flex style={[_.mt.md, showAdvance && styles.advanceContainer]}>
        <Text type={_.select('plain', 'title')} bold>
          {nickname}
          <Text type={_.select('plain', 'title')} bold>
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
