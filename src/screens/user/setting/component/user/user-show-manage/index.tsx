/*
 * @Author: czy0729
 * @Date: 2025-08-26 02:16:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-26 02:17:27
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

/** 显示收藏管理 */
function UserShowManage({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('userShowManage')
  const { hd } = TEXTS.userShowManage

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
        '0/2025/png/386799/1756198022494-ccafa523-9627-43a4-b13d-8219af8f8eaa.png',
        '0/2025/png/386799/1756198031064-f3e659bf-54af-4132-8b71-68da1ef8600c.png'
      ])}
      {...TEXTS.userShowManage}
    >
      <Heatmap id='设置.切换' title={hd} />
    </ItemSetting>
  ))
}

export default UserShowManage
