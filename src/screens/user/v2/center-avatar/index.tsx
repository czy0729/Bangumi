/*
 * @Author: czy0729
 * @Date: 2022-09-07 20:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 21:19:18
 */
import React from 'react'
import { View, Alert } from 'react-native'
import { Image, Heatmap, Touchable, Flex, Iconfont } from '@components'
import { getCDNAvatar } from '@_/base/avatar/utils'
import { _, systemStore, userStore } from '@stores'
import { feedback, info } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { s2tAsync } from '@utils/async'
import { Ctx } from '../types'
import { styles } from './styles'

const AVATAR_SIZE = _.r(88)

const HIT_SLOP = {
  top: 28,
  right: 16,
  bottom: 16,
  left: 28
} as const

function CenterAvatar(props, { $, navigation }: Ctx) {
  const { onlineStatus } = systemStore.setting
  const { avatar } = $.usersInfo
  const src = getCDNAvatar($.avatar || avatar?.large, 'bgm_poster_200')
  const fallback = typeof src === 'string' && !src.includes('//lain.bgm.tv/pic/user/l/')
  return (
    <View style={_.mt.md}>
      <Heatmap id='我的.跳转' to='UserSetting' alias='个人设置' />
      <Touchable
        animate
        onPress={() => {
          t('我的.跳转', {
            to: 'UserSetting'
          })

          navigation.push('UserSetting')
        }}
      >
        <Image
          key={src}
          style={styles.avatar}
          src={src}
          size={AVATAR_SIZE}
          radius={AVATAR_SIZE / 2}
          border={styles.avatar.backgroundColor}
          borderWidth={2}
          shadow
          fallback={fallback}
          fallbackSrc={avatar?.large}
        />
      </Touchable>
      <View style={styles.status}>
        <Touchable
          hitSlop={HIT_SLOP}
          animate
          scale={0.9}
          onPress={() => {
            const { onlineStatus } = systemStore.setting
            const buttons = [
              {
                text: s2tAsync('取消'),
                onPress: () => {}
              }
            ]

            if (!onlineStatus) {
              buttons.push({
                text: s2tAsync('公开'),
                onPress: async () => {
                  const result = await userStore.fetchOnlines()
                  if (!result) {
                    info('服务出错，设置公开状态失败')
                    return
                  }

                  systemStore.switchSetting('onlineStatus')
                  if (typeof result === 'object') {
                    info(`当前有 ${Object.keys(result).length} 个用户公开状态`)
                  }
                  feedback()

                  t('我的.在线状态', {
                    status: 'on'
                  })
                }
              })
            } else {
              buttons.push({
                text: s2tAsync('取消公开'),
                onPress: () => {
                  systemStore.switchSetting('onlineStatus')
                  feedback()

                  t('我的.在线状态', {
                    status: 'off'
                  })
                }
              })
            }

            Alert.alert(
              s2tAsync('公开在线状态'),
              s2tAsync(`此功能仅在 APP 内生效。
            \n同意公开后，在所有正在公开状态的用户间，会尽可能地在头像旁边显示在线状态标识
            \n1天内使用过 APP 是绿色标识，3天内是橙色，超过3天没有使用则会消失
            \n请注意，一旦同意后，标识会至少公开3天，尽管同意后又立马取消公开`),
              buttons
            )
          }}
        >
          <Flex style={styles.touch} justify='center'>
            {onlineStatus ? (
              <View style={styles.online} />
            ) : (
              <Iconfont
                style={styles.edit}
                name='md-edit'
                color='rgba(96, 96, 96, 0.48)'
                size={11}
              />
            )}
          </Flex>
        </Touchable>
      </View>
    </View>
  )
}

export default obc(CenterAvatar)
