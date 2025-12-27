/*
 * @Author: czy0729
 * @Date: 2020-07-28 22:28:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 18:19:26
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Filter({ $ }: Ctx) {
  r(COMPONENT)

  return useObserver(() => {
    const { isFriend } = $.state

    return (
      <View>
        <SegmentedControl
          key={String(isFriend)}
          style={styles.segment}
          size={11}
          values={DATA}
          selectedIndex={isFriend ? 1 : 0}
          onValueChange={$.onToggleFilter}
        />
        <Heatmap id='用户评分.切换类型' />
      </View>
    )
  })
}

export default Filter
