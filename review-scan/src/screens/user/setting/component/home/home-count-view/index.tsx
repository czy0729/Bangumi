/*
 * @Author: czy0729
 * @Date: 2024-04-24 09:34:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 09:42:36
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { SETTING_HOME_COUNT_VIEW } from '@constants'
import { HOME_COUNT_VIEW, TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'

/** 放送数字显示 */
function HomeCountView({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('homeCountView')

  return useObserver(() => (
    <ItemSettingBlock style={_.mt.sm} filter={filter} {...TEXTS.homeCountView}>
      {SETTING_HOME_COUNT_VIEW.map((item, index) => (
        <ItemSettingBlock.Item
          style={!!index && _.ml.md}
          title={item.label}
          information={HOME_COUNT_VIEW[item.label]}
          active={value === item.value}
          filter={filter}
          onPress={() => {
            if (value === item.value) return

            handleSet(item.label)

            t('设置.切换', {
              title: '放送数字显示',
              label: item.label
            })
          }}
        />
      ))}
      <Heatmap id='设置.切换' title='放送数字显示' />
    </ItemSettingBlock>
  ))
}

export default HomeCountView
