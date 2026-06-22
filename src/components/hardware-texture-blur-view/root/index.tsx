/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 20:03:41
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT_ROOT } from '../ds'

import type { HardwareTextureRootBlurViewProps } from '../type'

/** 对各个平台高斯模糊层的一个写法、用途、性能的取舍的统合组件 */
export const HardwareTextureRootBlurView = ({
  style,
  children
}: HardwareTextureRootBlurViewProps) => {
  r(COMPONENT_ROOT)

  return <View style={stl(_.container.flex, style)}>{children}</View>
}
