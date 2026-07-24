/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 17:30:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { styles } from './styles'

import type { WithFilterProps } from '../../../types'

/** 看板娘 Live2D 声音 */
function Live2DVoice({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('live2DVoice')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: 'Live2D 声音',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      sub
      {...TEXTS.live2DVoice}
    >
      <Heatmap id='设置.切换' title='Live2D 声音' />
    </ItemSetting>
  )
}

export default observer(Live2DVoice)
