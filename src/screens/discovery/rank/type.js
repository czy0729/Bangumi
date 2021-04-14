/*
 * @Author: czy0729
 * @Date: 2021-03-13 14:59:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-13 15:53:07
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const filterDS = ['全部', '收藏', '未收藏']

function Type({ $ }) {
  const { filter } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={filterDS}
        selectedIndex={filterDS.indexOf(filter)}
        onValueChange={$.toggleFilter}
      />
      <Heatmap id='排行榜.切换类型' />
    </View>
  )
}

export default ob(Type)

const styles = _.create({
  segment: {
    width: 128,
    height: 22
  }
})
