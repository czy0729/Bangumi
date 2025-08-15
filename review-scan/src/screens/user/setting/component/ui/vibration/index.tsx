/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:26:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 20:27:39
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 震动反馈 */
function Vibration({ filter }) {
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
