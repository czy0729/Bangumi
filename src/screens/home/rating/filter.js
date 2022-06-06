/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 10:59:30
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Filter({ $ }) {
  const { isFriend } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={['所有', '好友']}
        selectedIndex={isFriend ? 1 : 0}
        onValueChange={$.onToggleFilter}
      />
      <Heatmap id='用户评分.切换类型' />
    </View>
  )
}

export default ob(Filter)

const styles = _.create({
  segment: {
    width: _.r(88),
    height: _.r(28),
    marginRight: _.xs
  }
})
