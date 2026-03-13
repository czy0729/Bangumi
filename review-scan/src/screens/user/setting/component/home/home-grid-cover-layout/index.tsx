/*
 * @Author: czy0729
 * @Date: 2024-04-24 08:18:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 08:42:41
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { MODEL_SETTING_HOME_GRID_COVER_LAYOUT, SETTING_HOME_GRID_COVER_LAYOUT } from '@constants'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 封面形状 */
function HomeGridCoverLayout({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('homeGridCoverLayout')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={SETTING_HOME_GRID_COVER_LAYOUT.map(({ label }) => label)}
          selectedIndex={SETTING_HOME_GRID_COVER_LAYOUT.findIndex(item => item.value === value)}
          onValueChange={label => {
            handleSet(MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getValue(label))

            t('设置.切换', {
              title: '封面形状',
              label
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661062400888-2f305de2-9e5a-40ac-a878-1294c4de40fa.png',
        '0/2022/png/386799/1661062406213-0d748359-9e14-41e3-88a2-eeea58a1617c.png'
      ])}
      sub
      {...TEXTS.homeGridCoverLayout}
    >
      <Heatmap id='设置.切换' title='封面形状' />
    </ItemSetting>
  ))
}

export default HomeGridCoverLayout
