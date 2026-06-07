/*
 * @Author: czy0729
 * @Date: 2026-06-07 19:49:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 19:57:21
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

/** 水平列表两侧溢出遮罩 */
function HorizontalShowMask({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('horizontalShowMask')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '溢出遮罩',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.horizontalShowMask}
    >
      <Heatmap id='设置.切换' title='溢出遮罩' />
    </ItemSetting>
  )
}

export default observer(HorizontalShowMask)
