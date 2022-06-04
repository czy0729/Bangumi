/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 22:54:13
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['最新', '热门']
let type

function Type({ $ }) {
  // 缓存最近一次确定值
  if ($) type = $.state.type
  const currentType = $?.state.type === undefined ? type : $?.state.type

  return (
    <View>
      <SegmentedControl
        key={String(currentType === undefined)}
        style={styles.segment}
        size={11}
        values={typeDS}
        selectedIndex={currentType === 'collect' ? 1 : 0}
        onValueChange={$?.onToggleType || (() => {})}
      />
      <Heatmap id='目录.切换类型' />
    </View>
  )
}

export default ob(Type)

const styles = _.create({
  segment: {
    width: _.r(96),
    height: _.r(28)
  }
})
