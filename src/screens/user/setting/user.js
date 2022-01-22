/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 16:12:24
 */
import React from 'react'
import { ActionSheet, SegmentedControl, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { MODEL_SETTING_USER_GRID_NUM } from '@constants/model'
import styles from './styles'

function User() {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const { userGridNum } = systemStore.setting
    return (
      <>
        <ItemSetting hd='时光机' arrow highlight onPress={setTrue} />
        <ActionSheet show={state} onClose={setFalse}>
          {/* 网格布局个数 */}
          <ItemSetting
            hd='网格布局个数'
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={MODEL_SETTING_USER_GRID_NUM.data.map(({ label }) => label)}
                selectedIndex={MODEL_SETTING_USER_GRID_NUM.data.findIndex(
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
          >
            <Heatmap id='设置.切换' title='网格布局个数' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default User
