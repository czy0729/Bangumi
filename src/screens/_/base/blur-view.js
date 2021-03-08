/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 17:45:43
 */
import React from 'react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const BlurView = ob(({ style, children }) => (
  <ExpoBlurView
    style={[_.container.flex, style]}
    tint={_.isDark ? 'dark' : 'default'}
    intensity={100}
  >
    {children}
  </ExpoBlurView>
))
