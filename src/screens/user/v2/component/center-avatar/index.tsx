/*
 * @Author: czy0729
 * @Date: 2022-09-07 20:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:06:13
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Image, Touchable } from '@components'
import { getCDNAvatar } from '@components/avatar/utils'
import { _, systemStore, useStore } from '@stores'
import { fixImageProtocol } from '@utils/image'
import { handleAvatarPress, handleOnlinePress } from './utils'
import { AVATAR_SIZE, COMPONENT, HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function CenterAvatar() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { onlineStatus } = systemStore.setting
  const { avatar } = $.usersInfo
  const src = fixImageProtocol(getCDNAvatar($.avatar || avatar?.large, 'bgm_poster_200'))
  const fallback = typeof src === 'string' && !src.includes('//lain.bgm.tv/pic/user/l/')

  return (
    <View style={_.mt.md}>
      <Touchable animate onPress={() => handleAvatarPress(navigation)}>
        <Image
          key={src}
          style={styles.avatar}
          src={src}
          size={AVATAR_SIZE}
          radius={AVATAR_SIZE / 2}
          border={styles.avatar.backgroundColor}
          borderWidth={2}
          placeholder={false}
          fallback={fallback}
          fallbackSrc={avatar?.large}
        />
      </Touchable>
      <View style={styles.status}>
        <Touchable hitSlop={HIT_SLOP} animate scale={0.9} onPress={handleOnlinePress}>
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
      <Heatmap id='我的.跳转' to='UserSetting' alias='个人设置' />
    </View>
  )
}

export default observer(CenterAvatar)
