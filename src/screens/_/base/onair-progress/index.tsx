/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:39:13
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as OnairProgressProps } from './types'

export { OnairProgressProps }

export const OnairProgress = obc(
  ({ epStatus = 0, current = 0, total = 0, defaultTotal = 12 }: OnairProgressProps) => {
    const styles = memoStyles()
    const totalPercent = Math.min(
      (Math.floor(epStatus || 0) / Math.floor(total || defaultTotal)) * 100,
      100
    )

    const currentPercent = Math.min(
      (Math.floor(current || 0) / Math.floor(total || defaultTotal)) * 100,
      100
    )

    return (
      <View style={styles.progress}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${currentPercent ? Math.max(currentPercent, 10) : 0}%`
            }
          ]}
        />
        <View
          style={[
            styles.progressActive,
            {
              width: `${totalPercent ? Math.max(totalPercent, 10) : 0}%`
            }
          ]}
        />
      </View>
    )
  }
)
