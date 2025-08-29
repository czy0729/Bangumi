/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-21 12:57:03
 */
import React from 'react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import ob from '../ob'

function BlurView({ style, children }) {
  return (
    <ExpoBlurView
      style={stl(_.container.flex, style)}
      tint={_.isDark ? 'dark' : _.ios('extraLight', 'light')}
      intensity={100}
    >
      {children}
    </ExpoBlurView>
  )
}

export default ob(BlurView)
