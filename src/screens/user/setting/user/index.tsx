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
import { getShows } from '../utils'
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
        <ActionSheet show={state} onClose={setFalse}>
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
