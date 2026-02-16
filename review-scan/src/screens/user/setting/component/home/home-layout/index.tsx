/*
 * @Author: czy0729
 * @Date: 2024-04-23 23:13:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 08:26:35
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 首页布局 */
function HomeLayout({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('homeLayout')
  const list = MODEL_SETTING_HOME_LAYOUT.getValue('列表')
  const grid = MODEL_SETTING_HOME_LAYOUT.getValue('网格')

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661062359544-87e2ab4e-ca1f-4e7e-8efb-ccadf891ccc0.png',
        '0/2022/png/386799/1661062365513-c52a1484-e585-48e9-b672-8a0c547543b4.png'
      ])}
      {...TEXTS.homeLayout.setting}
    >
      <ItemSettingBlock.Item
        icon='md-menu'
        active={value === list}
        filter={filter}
        onPress={() => {
          if (value === list) return

          handleSet(list)

          t('设置.切换', {
            title: '首页布局',
            label: '列表'
          })
        }}
        {...TEXTS.homeLayout.list}
      />
      <ItemSettingBlock.Item
        style={_.ml.md}
        icon='md-grid-view'
        active={value === grid}
        filter={filter}
        onPress={() => {
          if (value === grid) return

          handleSet(grid)

          t('设置.切换', {
            title: '首页布局',
            label: '网格'
          })
        }}
        {...TEXTS.homeLayout.grid}
      />
      <Heatmap id='设置.切换' title='首页布局' />
    </ItemSettingBlock>
  ))
}

export default HomeLayout
