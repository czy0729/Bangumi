/*
 * @Author: czy0729
 * @Date: 2024-04-20 15:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 15:50:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

import type { WithFilterProps } from '../../../types'

/** 毛玻璃布局 */
function AndroidBlur({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('androidBlur')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '毛玻璃布局',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.androidBlur}
    >
      <Heatmap id='设置.切换' title='毛玻璃布局' />
    </ItemSetting>
  )
}

export default observer(AndroidBlur)
