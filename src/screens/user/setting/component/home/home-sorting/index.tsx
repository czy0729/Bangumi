/*
 * @Author: czy0729
 * @Date: 2024-04-24 09:45:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-20 01:02:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { MODEL_SETTING_HOME_SORTING, SETTING_HOME_SORTING } from '@constants'
import { HOME_SORTING_INFORMATION, TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

import type { WithFilterProps } from '../../../types'

/** 排序 */
function HomeSorting({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('homeSorting')

  return (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2026/png/386799/1784480417290-1a550c79-5afb-4771-bdf5-147fbe4a0aa1.png',
        '0/2026/png/386799/1784480427742-557ee678-a055-4e8f-815b-29f9bf5119c9.png',
        '0/2026/jpeg/386799/1784480443086-6e0ba732-058f-4e47-932a-c6ada34d9236.jpeg'
      ])}
      {...TEXTS.homeSorting}
    >
      {SETTING_HOME_SORTING.map((item, index) => (
        <ItemSettingBlock.Item
          style={!!index && _.ml.sm}
          title={item.label}
          information={HOME_SORTING_INFORMATION[item.label]}
          active={value === item.value}
          filter={filter}
          onPress={() => {
            if (value === item.value) return

            handleSet(MODEL_SETTING_HOME_SORTING.getValue(item.label))

            t('设置.切换', {
              title: '首页排序',
              label: item.label
            })
          }}
        />
      ))}
      <Heatmap id='设置.切换' title='首页排序' />
    </ItemSettingBlock>
  )
}

export default observer(HomeSorting)
