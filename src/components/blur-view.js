/*
 * @Author: czy0729
 * @Date: 2020-06-04 17:13:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2020-06-04 17:13:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { _ } from '@stores'

function BlurView({ style, children }) {
  return (
    <ExpoBlurView
      style={[_.container.flex, style]}
      tint={_.isDark ? 'dark' : 'default'}
      intensity={100}
    >
      {children}
    </ExpoBlurView>
  )
}

export default observer(BlurView)
