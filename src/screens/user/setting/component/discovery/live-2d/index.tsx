/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 01:13:52
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { styles } from './styles'

/** 看板娘 Live2D */
function Live2D({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('live2D')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: 'Live2D',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.live2D}
    >
      <Heatmap id='设置.切换' title='Live2D' />
    </ItemSetting>
  ))
}

export default Live2D
