/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:24:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 05:27:39
 */
import React from 'react'
import { View } from 'react-native'
import { Katakana as KText, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'
import { styles } from './styles'

/** 片假名终结者 */
function AppKatakana({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('katakana')

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661142420758-e002913c-f976-4a42-943b-5e106187fc29.png',
        '0/2022/png/386799/1661142591445-037feac4-31c1-4418-a377-557d1843e1e7.png'
      ])}
      {...TEXTS.katakana}
    >
      <ItemSettingBlock.Item
        title='关闭'
        active={!value}
        filter={filter}
        onPress={() => {
          if (!value) return

          handleSwitch()
        }}
      >
        <Text style={_.mt.sm} type='sub' size={12} lineHeight={20} bold>
          魔法少女まどか☆マギカ
        </Text>
      </ItemSettingBlock.Item>
      <ItemSettingBlock.Item
        style={_.ml.md}
        title='开启'
        active={value}
        filter={filter}
        onPress={() => {
          if (value) return

          handleSwitch()
        }}
      >
        <View style={_.mt.sm}>
          <KText.Provider itemStyle={styles.katakana} size={12} lineHeight={20} active>
            <KText type='sub' size={12} lineHeight={20} bold>
              魔法少女まどか☆マギカ
            </KText>
          </KText.Provider>
        </View>
      </ItemSettingBlock.Item>
    </ItemSettingBlock>
  ))
}

export default AppKatakana
