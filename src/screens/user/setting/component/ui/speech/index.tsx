/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 22:06:46
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { randomSpeech } from '@components/mesume/utils'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'
import { styles } from './styles'

/** 看板娘吐槽 */
function Speech({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('speech')

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661072680253-59856506-ac70-44d7-bba3-fd34fb8ffef3.png'
      ])}
      {...TEXTS.speech}
    >
      <ItemSettingBlock.Item
        title='开启'
        active={value}
        filter={filter}
        onPress={() => {
          if (value) return

          handleSwitch()

          t('设置.切换', {
            title: '看板娘吐槽',
            checked: !value
          })
        }}
      >
        <Text style={styles.speech} type='sub' size={11} align='center' numberOfLines={2}>
          {randomSpeech()}
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
            title: '看板娘吐槽',
            checked: !value
          })
        }}
      />

      <Heatmap id='设置.切换' title='看板娘吐槽' />
    </ItemSettingBlock>
  ))
}

export default Speech
