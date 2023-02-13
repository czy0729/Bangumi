/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:09:28
 */
import React from 'react'
import { ActionSheet, SegmentedControl, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { SETTING_USER_GRID_NUM } from '@constants'
import { getShows, getYuqueThumbs } from '../utils'
import styles from '../styles'
import { TEXTS } from './ds'

function User({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { userGridNum } = systemStore.setting
    return (
      <>
        <ItemSetting hd='时光机' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='时光机' onClose={setFalse}>
          {/* 网格布局个数 */}
          <ItemSetting
            show={shows.userGridNum}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={SETTING_USER_GRID_NUM.map(({ label }) => label)}
                selectedIndex={SETTING_USER_GRID_NUM.findIndex(
                  item => item.value === userGridNum
                )}
                onValueChange={label => {
                  if (label) {
                    t('设置.切换', {
                      title: '网格布局个数',
                      label
                    })
                    systemStore.setUserGridNum(label)
                  }
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
        </ActionSheet>
      </>
    )
  })
}

export default User
