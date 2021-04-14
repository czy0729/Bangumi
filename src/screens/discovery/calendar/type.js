/*
 * @Author: czy0729
 * @Date: 2021-03-13 14:59:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-13 15:49:04
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['全部', '收藏']

function Type({ $ }) {
  const { type } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={typeDS}
        selectedIndex={type === 'all' ? 0 : 1}
        onValueChange={$.toggleType}
      />
      <Heatmap id='每日放送.切换类型' />
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
