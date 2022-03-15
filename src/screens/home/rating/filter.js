/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 18:03:52
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const filterDS = ['所有', '好友']

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
    width: _.r(88),
    height: _.r(22),
    marginRight: _.xs
  }
})
