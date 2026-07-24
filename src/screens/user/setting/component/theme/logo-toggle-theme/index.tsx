/*
 * @Author: czy0729
 * @Date: 2024-09-29 20:00:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:11:14
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

/** 快速切换主题 */
function LogoToggleTheme({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('logoToggleTheme')

  const title = TEXTS.logoToggleTheme.hd

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title,
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.logoToggleTheme}
    >
      <Heatmap id='设置.切换' title={title} />
    </ItemSetting>
  )
}

export default observer(LogoToggleTheme)
