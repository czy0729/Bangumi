/*
 * @Author: czy0729
 * @Date: 2024-04-19 21:16:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:34:25
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

/** 屏蔽无头像用户相关信息 */
function FilterDefault({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('filterDefault')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '屏蔽默认头像用户相关信息',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661132417052-63f81f6b-30ab-4da7-a31f-3a6c927847d6.png',
        '0/2022/png/386799/1661132420774-00900fe7-99c8-4d8d-bdd7-a23a9f7fec07.png'
      ])}
      {...TEXTS.filterDefault}
    >
      <Heatmap id='设置.切换' title='屏蔽默认头像用户相关信息' />
    </ItemSetting>
  )
}

export default observer(FilterDefault)
