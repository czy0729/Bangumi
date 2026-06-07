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
import { getYuqueThumbs } from '../../../utils'

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
      thumb={getYuqueThumbs([
        '0/2026/png/386799/1780848631047-224f84fc-14d2-476b-9c16-88d96ffc21fc.png',
        '0/2026/png/386799/1780848644201-2de67dec-3fda-4673-98a6-1fe4c988ffc2.png'
      ])}
      {...TEXTS.horizontalShowMask}
    >
      <Heatmap id='设置.切换' title='溢出遮罩' />
    </ItemSetting>
  )
}

export default observer(HorizontalShowMask)
