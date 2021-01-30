/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:24:50
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['默认', '同步率', '最近']

function Sort({ $ }) {
  const { sort } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={typeDS}
        selectedIndex={sort === 'percent' ? 1 : sort === 'recent' ? 2 : 0}
        onValueChange={$.sort}
      />
      <Heatmap id='好友.排序' />
    </View>
  )
}

export default ob(Sort)

const styles = _.create({
  segment: {
    width: 128,
    height: 22
  }
})
