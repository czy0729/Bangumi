/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-30 17:07:32
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
