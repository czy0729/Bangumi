/*
 * @Author: czy0729
 * @Date: 2024-04-19 04:31:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-19 17:35:54
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 优先中文 */
function CnFirst({ filter, sub = false }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('cnFirst')

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661129866639-05608a0c-bc41-4065-b3c2-aa53bd63d327.png',
        '0/2022/png/386799/1661129870321-251db53c-5a80-4d99-a32b-a31749c40b27.png'
      ])}
      sub={sub}
      {...TEXTS.cnFirst}
    >
      <ItemSettingBlock.Item
        title='开启'
        active={value}
        filter={filter}
        onPress={() => {
          if (value) return

          handleSwitch()

          t('设置.切换', {
            title: '优先中文',
            checked: !value
          })
        }}
      >
        <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center'>
          看过 ep.1 始まりの物語{'\n'}
          <Text type='sub' size={11} lineHeight={13} underline>
            魔法少女小圆
          </Text>
        </Text>
      </ItemSettingBlock.Item>
      <ItemSettingBlock.Item
        style={_.ml.md}
        title='关闭'
        active={!value}
        filter={filter}
        onPress={() => {
          if (!value) return

          handleSwitch()

          t('设置.切换', {
            title: '优先中文',
            checked: !value
          })
        }}
      >
        <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center'>
          看过 ep.1 始まりの物語{'\n'}
          <Text type='sub' size={11} lineHeight={13} underline>
            魔法少女まどか☆マギカ
          </Text>
        </Text>
      </ItemSettingBlock.Item>
      <Heatmap id='设置.切换' title='优先中文' />
    </ItemSettingBlock>
  ))
}

export default CnFirst
