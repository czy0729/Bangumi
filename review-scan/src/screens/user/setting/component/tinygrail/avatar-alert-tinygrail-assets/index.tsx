/*
 * @Author: czy0729
 * @Date: 2025-05-16 15:07:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-16 15:12:23
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 在全局中, 是否长按用户头像也显示小圣杯缩略资产 */
function AvatarAlertTinygrailAssets({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('avatarAlertTinygrailAssets')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '缩略资产',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.avatarAlertTinygrailAssets}
    >
      <Heatmap id='设置.切换' title='缩略资产' />
    </ItemSetting>
  ))
}

export default AvatarAlertTinygrailAssets
