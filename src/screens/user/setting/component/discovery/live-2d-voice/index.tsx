/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 22:51:28
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { styles } from './styles'

/** 看板娘 Live2D 声音 */
function Live2DVoice({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('live2DVoice')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '看板娘 Live2D 声音',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      sub
      {...TEXTS.live2DVoice}
    >
      <Heatmap id='设置.切换' title='看板娘 Live2D 声音' />
    </ItemSetting>
  ))
}

export default Live2DVoice
