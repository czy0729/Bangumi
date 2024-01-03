/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:10:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:32:21
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, SCORES_DS } from './ds'
import { styles } from './styles'

function RateSegement(props, { $ }: Ctx) {
  const { filterScores } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={SCORES_DS}
        selectedIndex={
          filterScores.length ? SCORES_DS.findIndex(item => item === filterScores.join('-')) : 0
        }
        onValueChange={$.filterScores}
      />
      <Heatmap right={30} bottom={-4} id='条目.筛选分数' />
    </View>
  )
}

export default obc(RateSegement, COMPONENT)
