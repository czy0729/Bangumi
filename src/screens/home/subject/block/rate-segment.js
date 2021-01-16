/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:10:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:13:14
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const scoresDS = ['全部', '9-10', '7-8', '4-6', '1-3']

function RateSegement(props, { $ }) {
  const { filterScores } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={scoresDS}
        selectedIndex={
          filterScores.length
            ? scoresDS.findIndex(item => item === filterScores.join('-'))
            : 0
        }
        onValueChange={$.filterScores}
      />
      <Heatmap right={30} bottom={-4} id='条目.筛选分数' />
    </View>
  )
}

export default obc(RateSegement)

const styles = _.create({
  segment: {
    height: 22
  }
})
