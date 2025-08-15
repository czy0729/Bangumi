/*
 * @Author: czy0729
 * @Date: 2024-04-20 00:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-18 11:51:52
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { TEXTS } from '../ds'
import { getYuqueThumbs } from '../../../utils'
import { handleDark, handleDeepDark, handleLight } from './utils'

/** 主题 */
function AppTheme({ filter }) {
  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661068629567-49cdcbef-26cb-40f4-aff9-059427a8f27e.png',
        '0/2022/png/386799/1661068632037-870a9c78-0478-4ce9-8696-c52812f70be0.png',
        '0/2022/png/386799/1661068634586-b7c73edc-a671-4922-8f85-b04448aa4b9c.png'
      ])}
      {...TEXTS.theme.setting}
    >
      {!WEB && (
        <ItemSettingBlock.Item
          style={_.mr.md}
          icon='sunny'
          iconColor={_.colorYellow}
          active={!_.isDark}
          filter={filter}
          onPress={handleLight}
          {...TEXTS.theme.light}
        >
          <Heatmap id='设置.切换' title='黑暗模式' />
        </ItemSettingBlock.Item>
      )}
      <ItemSettingBlock.Item
        style={_.mr.md}
        icon='moon'
        iconColor={_.colorYellow}
        active={_.isDark && systemStore.setting.deepDark}
        filter={filter}
        onPress={handleDeepDark}
        {...TEXTS.theme.deepDark}
      >
        <Heatmap id='设置.切换' title='纯黑' />
      </ItemSettingBlock.Item>
      <ItemSettingBlock.Item
        icon='moon'
        iconColor={_.colorYellow}
        active={_.isDark && !systemStore.setting.deepDark}
        filter={filter}
        onPress={handleDark}
        {...TEXTS.theme.dark}
      >
        <Heatmap id='设置.切换' title='纯黑' />
      </ItemSettingBlock.Item>
    </ItemSettingBlock>
  ))
}

export default AppTheme
