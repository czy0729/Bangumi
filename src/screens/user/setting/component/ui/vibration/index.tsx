/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:26:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 19:56:03
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { IconVibrate } from '../../icons'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

import type { WithFilterProps } from '../../../types'

/** 震动反馈 */
function Vibration({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('vibration')

  return (
    <ItemSetting
      icon={<IconVibrate />}
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
  )
}

export default observer(Vibration)
