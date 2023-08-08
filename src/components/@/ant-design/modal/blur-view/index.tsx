/*
 * @Author: czy0729
 * @Date: 2022-11-04 11:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 17:49:42
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { memoStyles } from './styles'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

export const BlurView = observer(
  ({ style, intensity = 100, children }: BlurViewProps) => {
    const styles = memoStyles()
    return (
      <ExpoBlurView
        style={stl(styles.blurView, style)}
        tint={_.isDark ? 'dark' : 'light'}
        intensity={intensity}
      >
        {children}
      </ExpoBlurView>
    )
  }
)
