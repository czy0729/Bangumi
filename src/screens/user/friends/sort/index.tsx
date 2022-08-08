/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:28:29
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const typeDS = ['默认', '同步率', '最近'] as const

function Sort({ $ }: Ctx) {
  const { sort, _loaded } = $.state
  return (
    <View>
      <SegmentedControl
        key={String(_loaded)}
        style={styles.segment}
        size={11}
        values={typeDS}
        selectedIndex={sort === 'percent' ? 1 : sort === 'recent' ? 2 : 0}
        onValueChange={$.onSort}
      />
      <Heatmap id='好友.排序' />
    </View>
  )
}

export default ob(Sort)
