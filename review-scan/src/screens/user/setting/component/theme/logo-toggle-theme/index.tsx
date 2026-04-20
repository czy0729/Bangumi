/*
 * @Author: czy0729
 * @Date: 2024-09-29 20:00:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-29 20:10:31
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 快速切换主题 */
function LogoToggleTheme({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('logoToggleTheme')
  const title = TEXTS.logoToggleTheme.hd

  return useObserver(() => (
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
  ))
}

export default LogoToggleTheme
