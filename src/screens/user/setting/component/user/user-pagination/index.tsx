/*
 * @Author: czy0729
 * @Date: 2025-08-26 01:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-26 01:45:10
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'
import { styles } from './styles'

/** 列表分页 */
function UserPagination({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('userPagination')
  const { hd } = TEXTS.userPagination

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: hd,
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2025/png/386799/1756143357219-f163ddf8-8a80-4498-b7d4-d5c07537364b.png',
        '0/2025/png/386799/1756143376981-d5c3a099-8c23-48ca-ae4b-d6d8cd8eb4b4.png',
        '0/2025/png/386799/1756143791214-c9bb4c83-9706-4f46-8c6a-42f0c2e98bab.png'
      ])}
      {...TEXTS.userPagination}
    >
      <Heatmap id='设置.切换' title={hd} />
    </ItemSetting>
  ))
}

export default UserPagination
