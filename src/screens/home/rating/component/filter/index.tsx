/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:39:12
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Heatmap, SegmentedControl } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Filter({ $ }: Ctx) {
  r(COMPONENT)

  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={DATA}
        selectedIndex={$.state.isFriend ? 1 : 0}
        onValueChange={$.onToggleFilter}
      />
      <Heatmap id='用户评分.切换类型' />
    </View>
  )
}

export default observer(Filter)
