/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 09:38:55
 */
import React from 'react'
import { Animated } from 'react-native'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { memoStyles } from './styles'
import { Props } from './types'

export function TabBarIndicator({ style, scrollX }: Props) {
  return useObserver(() => {
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
  })
}
