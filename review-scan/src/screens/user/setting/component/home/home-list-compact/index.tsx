/*
 * @Author: czy0729
 * @Date: 2024-04-24 03:30:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 03:32:49
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 紧凑模式 */
function HomeListCompact({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('homeListCompact')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '紧凑模式',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2023/png/386799/1688330856001-89109af5-3f19-4ab6-92f9-4658a1556b7c.png',
        '0/2023/png/386799/1688330868988-1d338344-c951-4aef-b71f-ea7a996bbf1f.png'
      ])}
      sub
      {...TEXTS.homeListCompact}
    >
      <Heatmap id='设置.切换' title='紧凑模式' />
    </ItemSetting>
  ))
}

export default HomeListCompact
