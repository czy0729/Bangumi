/*
 * @Author: czy0729
 * @Date: 2024-04-19 20:00:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-19 20:01:25
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

import type { WithFilterProps } from '../../../types'

/** 打开外部浏览器前复制网址 */
function OpenInfo({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('openInfo')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '复制网址',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.openInfo}
    >
      <Heatmap id='设置.切换' title='复制网址' />
    </ItemSetting>
  )
}

export default observer(OpenInfo)
