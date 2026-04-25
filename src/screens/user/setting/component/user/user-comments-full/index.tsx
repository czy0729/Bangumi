/*
 * @Author: czy0729
 * @Date: 2026-04-25 21:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 21:51:59
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

import type { WithFilterProps } from '../../../types'

/** 评论占满布局 */
function UserCommentsFull({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('userCommentsFull')
  const { hd } = TEXTS.userCommentsFull

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
        '0/2026/png/386799/1777125085817-11f56cf9-9407-4f64-a85f-735f8fffd8b9.png',
        '0/2026/png/386799/1777125093175-67ad2a56-febf-471a-af8d-9d77047cc5bc.png'
      ])}
      {...TEXTS.userCommentsFull}
    >
      <Heatmap id='设置.切换' title={hd} />
    </ItemSetting>
  ))
}

export default UserCommentsFull
