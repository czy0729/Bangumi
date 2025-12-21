/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 22:56:40
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { styles } from './styles'

/** 今日放送 */
function DiscoveryTodayOnair({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('discoveryTodayOnair')

  return useObserver(() => (
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
  ))
}

export default DiscoveryTodayOnair
