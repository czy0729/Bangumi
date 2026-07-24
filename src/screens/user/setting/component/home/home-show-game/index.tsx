/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:00:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:02:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

import type { WithFilterProps } from '../../../types'

/** 游戏标签页 */
function HomeShowGame({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('showGame')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '显示游戏',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661045149065-c6d393f9-8649-4239-a459-b9f8c99c3a50.png',
        '0/2022/png/386799/1661045159272-5b09aea4-c609-4caa-b705-281d23026fa7.png'
      ])}
      {...TEXTS.showGame}
    >
      <Heatmap id='设置.切换' title='显示游戏' />
    </ItemSetting>
  )
}

export default observer(HomeShowGame)
