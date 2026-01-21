/*
 * @Author: czy0729
 * @Date: 2024-04-24 11:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 11:10:15
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

function HomeEpStartAtLast({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('homeEpStartAtLastWathed')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '长篇动画从最后看过开始显示',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2023/png/386799/1673684120408-ee3db302-a9d2-41a3-bc53-56788d523839.png',
        '0/2023/png/386799/1673684144406-ff53b877-e632-4c13-af16-b5daad4033ba.png'
      ])}
      {...TEXTS.homeEpStartAtLastWathed}
    >
      <Heatmap id='设置.切换' title='长篇动画从最后看过开始显示' />
    </ItemSetting>
  ))
}

export default HomeEpStartAtLast
