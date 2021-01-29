/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 00:42:13
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const filterDS = ['所有人', '好友']

function Filter({ $ }) {
  const { isFriend } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={filterDS}
        selectedIndex={isFriend ? 1 : 0}
        onValueChange={$.toggleFilter}
      />
      <Heatmap id='用户评分.切换类型' />
    </View>
  )
}

export default ob(Filter)

const styles = _.create({
  segment: {
    width: 88,
    height: 22
  }
})
