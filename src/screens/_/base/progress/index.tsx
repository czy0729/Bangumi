/*
 * @Author: czy0729
 * @Date: 2024-04-03 08:43:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:19:41
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ColorValue } from '@types'
import type { Props as ProgressProps } from './types'
export type { ProgressProps }

export const Progress = observer(({ style, current, total, children }: ProgressProps) => {
  r(COMPONENT)

  const styles = memoStyles()

  let barColor: ColorValue = _.colorSuccess
  let percent = 1
  if (current && total) {
    percent = Math.max(Math.min(current / total, 1), 0.06)
    if (percent < 1) {
      barColor = _.colorPrimary
    }
  } else {
    percent = 0
  }

  return (
    <View style={stl(styles.progress, style)}>
      {children}
      <View style={styles.bar} />
      <View
        style={[
          styles.bar,
          {
            width: `${percent * 100}%`,
            backgroundColor: barColor
          }
        ]}
      />
    </View>
  )
})

export default Progress
