/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:23:45
 */
import React from 'react'
import { BlurView, BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Bg = memo(
  ({ style, src, cdn = true }) => (
    <BlurView
      style={style}
      tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
      src={src}
      intensity={80}
      blurRadius={32}
      cdn={cdn}
    />
  ),
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Bg
