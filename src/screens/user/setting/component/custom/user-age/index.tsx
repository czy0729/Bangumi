/*
 * @Author: czy0729
 * @Date: 2025-01-25 14:45:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 14:52:19
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 用户站龄 */
function UserAge({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('userAge')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '用户站龄',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2025/png/386799/1737787893742-58339256-7090-486e-8b6b-083cebe5e9b7.png'
      ])}
      {...TEXTS.userAge}
    >
      <Heatmap id='设置.切换' title='用户站龄' />
    </ItemSetting>
  ))
}

export default UserAge
