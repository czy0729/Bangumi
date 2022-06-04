/*
 * @Author: czy0729
 * @Date: 2021-03-13 14:59:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 00:49:47
 */
import React from 'react'
import { View } from 'react-native'
import {
  // Heatmap,
  SegmentedControl
} from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['全部', '收藏']

function Type({ type, onChange }) {
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={typeDS}
        selectedIndex={type === 'collect' ? 1 : 0}
        onValueChange={onChange}
      />
      {/* <Heatmap id='每日放送.切换类型' /> */}
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
