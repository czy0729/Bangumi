/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 13:54:10
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['最新', '热门']

function Type({ $ }) {
  const { type } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={typeDS}
        selectedIndex={type === 'collect' ? 1 : 0}
        onValueChange={$.toggleType}
      />
      <Heatmap id='目录.切换类型' />
    </View>
  )
}

export default ob(Type)

const styles = _.create({
  segment: {
    width: 80,
    height: 22
  }
})
