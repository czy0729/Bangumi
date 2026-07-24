/*
 * @Author: czy0729
 * @Date: 2024-04-19 21:31:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:34:41
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

/** 屏蔽敏感内容 */
function FilterNSFW({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('filter18x')

  return (
    <ItemSetting
      hd='屏蔽敏感内容'
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '屏蔽敏感内容',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.filter18x}
    >
      <Heatmap id='设置.切换' title='屏蔽敏感内容' />
    </ItemSetting>
  )
}

export default observer(FilterNSFW)
