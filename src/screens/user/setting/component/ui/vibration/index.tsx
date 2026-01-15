/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:26:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 13:00:29
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

import type { WithFilterProps } from '../../../types'

/** 震动反馈 */
function Vibration({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('vibration')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '震动',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.vibration}
    >
      <Heatmap id='设置.切换' title='震动' />
    </ItemSetting>
  ))
}

export default Vibration
