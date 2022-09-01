/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:35:45
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function Filter({ $ }: Ctx) {
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
