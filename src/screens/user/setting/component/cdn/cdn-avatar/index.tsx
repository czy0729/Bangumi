/*
 * @Author: czy0729
 * @Date: 2024-04-21 04:57:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 05:38:11
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { checkAdvance } from './utils'

import type { WithFilterProps } from '../../../types'

function CDNAvatar({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('cdnAvatarV2')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onAsyncPress={async () => {
            const flag = await checkAdvance()
            if (!flag) return

            handleSwitch()

            t('设置.切换', {
              title: '头像加速',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      sub
      {...TEXTS.cdnAvatarV2}
    >
      <Heatmap id='设置.切换' title='头像加速' />
    </ItemSetting>
  )
}

export default observer(CDNAvatar)
