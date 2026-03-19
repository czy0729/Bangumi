/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 02:01:47
 */
import React from 'react'
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function TabBarIndicator({ style, scrollX }: Props) {
  const styles = memoStyles()

  return (
    <Animated.View
      style={stl(styles.indicator, style, {
        transform: [
          {
            translateX: scrollX
          }
        ]
      })}
    />
  )
}

export default observer(TabBarIndicator)
