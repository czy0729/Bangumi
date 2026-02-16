/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:22:55
 */
import React from 'react'
import { BlurView, BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Bg = memo(
  ({ style, src = '', cdn = true, height = 160 }) => (
    <BlurView
      style={style}
      tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
      src={src}
      height={height}
      intensity={80}
      blurRadius={_.web(16, 8)}
      cdn={cdn}
    />
  ),
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Bg
