/*
 * @Author: czy0729
 * @Date: 2024-04-24 09:45:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 10:26:21
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { MODEL_SETTING_HOME_SORTING, SETTING_HOME_SORTING } from '@constants'
import { HOME_SORTING_INFORMATION, TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'

/** 排序 */
function HomeSorting({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('homeSorting')

  return useObserver(() => (
    <ItemSettingBlock style={_.mt.sm} filter={filter} {...TEXTS.homeSorting}>
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
  ))
}

export default HomeSorting
