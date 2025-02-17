/*
 * @Author: czy0729
 * @Date: 2024-04-25 04:56:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 09:21:57
 */
import React from 'react'
import { Heatmap, SwitchPro, Touchable } from '@components'
import { ItemSetting } from '@_'
import { uiStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 显示缩略信息 */
function TimelinePopable({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('timelinePopable')

  return useObserver(() => (
    <>
      <ItemSetting
        ft={
          <SwitchPro
            style={commonStyles.switch}
            value={value}
            onSyncPress={() => {
              handleSwitch()

              t('设置.切换', {
                title: '显示缩略信息',
                checked: !value
              })
            }}
          />
        }
        filter={filter}
        {...TEXTS.timelinePopable}
      >
        <Heatmap id='设置.切换' title='显示缩略信息' />
      </ItemSetting>
      <Touchable
        style={commonStyles.closePopablePlaceholder}
        withoutFeedback
        onPress={() => {
          uiStore.closePopableSubject()
        }}
      />
    </>
  ))
}

export default TimelinePopable
