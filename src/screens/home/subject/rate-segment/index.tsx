/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:10:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 02:15:07
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const SCORES_DS = ['全部', '9-10', '7-8', '4-6', '1-3'] as const

function RateSegement(props, { $ }: Ctx) {
  global.rerender('Subject.RateSegement')

  const { filterScores } = $.state
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={SCORES_DS}
        selectedIndex={
          filterScores.length
            ? SCORES_DS.findIndex(item => item === filterScores.join('-'))
            : 0
        }
        onValueChange={$.filterScores}
      />
      <Heatmap right={30} bottom={-4} id='条目.筛选分数' />
    </View>
  )
}

export default obc(RateSegement)
