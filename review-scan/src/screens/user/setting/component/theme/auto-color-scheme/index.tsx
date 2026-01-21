/*
 * @Author: czy0729
 * @Date: 2024-04-20 00:42:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-20 00:42:34
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 跟随系统 */
function AutoColorScheme({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('autoColorScheme')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '跟随系统',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.autoColorScheme}
    >
      <Heatmap id='设置.切换' title='跟随系统' />
    </ItemSetting>
  ))
}

export default AutoColorScheme
