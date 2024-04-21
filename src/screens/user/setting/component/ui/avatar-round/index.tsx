/*
 * @Author: czy0729
 * @Date: 2024-04-20 19:24:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 20:31:14
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _, userStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { IMG_DEFAULT_AVATAR } from '@constants'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 头像圆角 */
function AvatarRound({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('avatarRound')

  return useObserver(() => {
    const avatar = userStore.usersInfo()?.avatar?.large || IMG_DEFAULT_AVATAR
    return (
      <ItemSettingBlock
        style={_.mt.sm}
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661073314717-f67e17c1-0ae4-4e19-b61a-4fdaf2eb4bdd.png',
          '0/2022/png/386799/1661073326148-8687046a-026a-4217-a3b3-1209dc3470e2.png'
        ])}
        {...TEXTS.avatarRound.setting}
      >
        <ItemSettingBlock.Item
          active={value}
          filter={filter}
          onPress={() => {
            if (value) return

            handleSwitch()

            t('设置.切换', {
              title: '圆形头像',
              checked: !value
            })
          }}
          {...TEXTS.avatarRound.round}
        >
          <View style={_.mt.sm}>
            <Avatar size={28} src={avatar} round />
          </View>
        </ItemSettingBlock.Item>
        <ItemSettingBlock.Item
          style={_.ml.md}
          active={!value}
          filter={filter}
          onPress={() => {
            if (!value) return

            handleSwitch()

            t('设置.切换', {
              title: '圆形头像',
              checked: !value
            })
          }}
          {...TEXTS.avatarRound.square}
        >
          <View style={_.mt.sm}>
            <Avatar size={28} src={avatar} radius={_.radiusXs} />
          </View>
        </ItemSettingBlock.Item>
        <Heatmap id='设置.切换' title='圆形头像' />
      </ItemSettingBlock>
    )
  })
}

export default AvatarRound
