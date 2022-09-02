/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 13:56:49
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const TYPE_DS = ['最新', '热门'] as const

let type: any

function Type({ $ }: Ctx) {
  // 缓存最近一次确定值
  if ($) type = $.state.type
  const currentType = $?.state.type === undefined ? type : $?.state.type

  return (
    <View>
      <SegmentedControl
        key={String(currentType === undefined)}
        style={styles.segment}
        size={11}
        values={TYPE_DS}
        selectedIndex={currentType === 'collect' ? 1 : 0}
        onValueChange={$?.onToggleType || (() => {})}
      />
      <Heatmap id='目录.切换类型' />
    </View>
  )
}

export default ob(Type)
