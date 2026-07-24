/*
 * @Author: czy0729
 * @Date: 2024-04-19 21:00:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-19 21:09:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

import type { WithFilterProps } from '../../../types'

/** 隐藏评分 */
function HideScore({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('hideScore')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '隐藏评分',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661132442436-448bd333-0fbc-4c7d-b411-044753cf9f47.png',
        '0/2022/png/386799/1661132444558-4965411c-4319-4050-b63c-98a28a28ddb2.png'
      ])}
      {...TEXTS.hideScore}
    >
      <Heatmap id='设置.切换' title='隐藏评分' />
    </ItemSetting>
  )
}

export default observer(HideScore)
