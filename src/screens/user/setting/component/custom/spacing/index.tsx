/*
 * @Author: czy0729
 * @Date: 2025-08-19 20:58:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-19 23:42:00
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 文字排版 */
function Spacing({ filter, sub = false }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('spacing')

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2025/png/386799/1755618055540-8afa8787-625d-42a6-b661-b401ad9a33c2.png',
        '0/2025/png/386799/1755618070613-1b0ba14f-75f1-48db-92b2-e42557a94486.png'
      ])}
      sub={sub}
      {...TEXTS.spacing}
    >
      <ItemSettingBlock.Item
        title='开启'
        active={value}
        filter={filter}
        onPress={() => {
          if (value) return

          handleSwitch()

          t('设置.切换', {
            title: '文字排版',
            checked: !value
          })
        }}
      >
        <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center' spacing={false}>
          薬屋のひとりごと 第 2 期
        </Text>
        <Text type='sub' size={11} lineHeight={13} align='center' spacing={false}>
          24 话 / 2025年 1 月 10 日
        </Text>
      </ItemSettingBlock.Item>
      <ItemSettingBlock.Item
        style={_.ml.md}
        title='关闭'
        active={!value}
        filter={filter}
        onPress={() => {
          if (!value) return

          handleSwitch()

          t('设置.切换', {
            title: '文字排版',
            checked: !value
          })
        }}
      >
        <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center' spacing={false}>
          薬屋のひとりごと 第2期
        </Text>
        <Text type='sub' size={11} lineHeight={13} align='center' spacing={false}>
          24话 / 2025年1月10日
        </Text>
      </ItemSettingBlock.Item>
      <Heatmap id='设置.切换' title='文字排版' />
    </ItemSettingBlock>
  ))
}

export default Spacing
