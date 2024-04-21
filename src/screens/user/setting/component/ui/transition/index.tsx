/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 20:25:23
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { SETTING_TRANSITION } from '@constants'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'

/** 切页动画 */
function Transition({ filter }) {
  return useObserver(() => (
    <ItemSetting
      ft={
        <SegmentedControl
          style={commonStyles.segmentedControl}
          size={12}
          values={SETTING_TRANSITION.map(({ label }) => label)}
          selectedIndex={SETTING_TRANSITION.findIndex(
            item => item.value === systemStore.setting.transition
          )}
          onValueChange={label => {
            if (label) {
              systemStore.setTransition(label)

              t('设置.切换', {
                title: '切页动画',
                label
              })
            }
          }}
        />
      }
      filter={filter}
      {...TEXTS.transition}
    >
      <Heatmap id='设置.切换' title='切页动画' />
    </ItemSetting>
  ))
}

export default Transition
