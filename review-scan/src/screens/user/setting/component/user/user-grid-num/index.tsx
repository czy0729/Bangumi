/*
 * @Author: czy0729
 * @Date: 2024-04-26 04:16:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 04:20:43
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { SETTING_USER_GRID_NUM } from '@constants'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 网格布局个数 */
function UserGridNum({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('userGridNum')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={SETTING_USER_GRID_NUM.map(({ label }) => label)}
          selectedIndex={SETTING_USER_GRID_NUM.findIndex(item => item.value == value)}
          onValueChange={label => {
            handleSet(label)

            t('设置.切换', {
              title: '网格布局个数',
              label
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661208352105-3fa86285-01cd-4d4d-9a1b-cc45f70ef80f.png',
        '0/2022/png/386799/1661208356246-d2be037e-2770-4d8c-911f-3ce549dc46b0.png',
        '0/2022/png/386799/1661208362277-16206efc-d59d-49a1-b023-b3a9626ff2c3.png'
      ])}
      {...TEXTS.userGridNum}
    >
      <Heatmap id='设置.切换' title='网格布局个数' />
    </ItemSetting>
  ))
}

export default UserGridNum
