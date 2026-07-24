/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 17:28:06
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

/** 今日放送 */
function DiscoveryTodayOnair({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('discoveryTodayOnair')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '发现今日放送',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.discoveryTodayOnair}
    >
      <Heatmap id='设置.切换' title='发现今日放送' />
    </ItemSetting>
  )
}

export default observer(DiscoveryTodayOnair)
