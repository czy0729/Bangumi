/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 17:28:25
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

/** 看板娘 Live2D */
function Live2D({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('live2DV2')

  return (
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
      {...TEXTS.live2DV2}
    >
      <Heatmap id='设置.切换' title='Live2D' />
    </ItemSetting>
  )
}

export default observer(Live2D)
