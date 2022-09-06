/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 21:27:17
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import More from '../more'
import { Ctx, TypeType } from '../types'
import { styles } from './styles'

const TYPE_DS = ['高级', '最新', '热门'] as const

let type: any

function Type({ $ }: Ctx) {
  // 缓存最近一次确定值
  if ($) type = $.state.type
  const currentType: TypeType = $?.state.type === undefined ? type : $?.state.type

  let selectedIndex = 2
  if (currentType === 'advance') selectedIndex = 0
  if (currentType === 'collect') selectedIndex = 1
  return (
    <Flex style={_.mr.md}>
      <View>
        <SegmentedControl
          key={String($?.state?._loaded)}
          style={styles.segment}
          size={11}
          values={TYPE_DS}
          selectedIndex={selectedIndex}
          onValueChange={$?.onToggleType || (() => {})}
        />
        <Heatmap id='目录.切换类型' />
      </View>
      <More key={String($?.state?._loaded)} $={$} />
    </Flex>
  )
}

export default ob(Type)
