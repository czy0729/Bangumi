/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 02:00:00
 */
import React from 'react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { BlurRootView } from '../../blur-layer'
import { COMPONENT_ROOT, DEFAULT_NODE_NAME } from '../ds'

import type { HardwareTextureRootBlurViewProps } from '../type'

/** 对各个平台高斯模糊层的一个写法、用途、性能的取舍的统合组件 */
export const HardwareTextureRootBlurView = ({
  style,
  name = DEFAULT_NODE_NAME,
  children
}: HardwareTextureRootBlurViewProps) => {
  r(COMPONENT_ROOT)

  return (
    <BlurRootView name={name} style={stl(_.container.flex, style)}>
      {children}
    </BlurRootView>
  )
}
