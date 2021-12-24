/*
 * @Author: czy0729
 * @Date: 2021-12-25 05:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-25 07:50:20
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { ItemSetting } from '@screens/_'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'

function Theme() {
  const { deepDark } = systemStore.setting
  const label = _.isDark ? (deepDark ? '深黑' : '黑暗') : '白天'
  return (
    <ItemSetting
      hd='主题'
      ft={
        <Text type='sub' size={15}>
          {label}
        </Text>
      }
      arrow
      information='点击顶部Logo可快速切换，长按则前往设置'
    >
      <Heatmap
        id='设置.切换'
        data={{
          title: '黑暗模式'
        }}
      />
    </ItemSetting>
  )
}

export default ob(Theme)
