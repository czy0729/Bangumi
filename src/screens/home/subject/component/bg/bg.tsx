/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 23:09:26
 */
import React from 'react'
import { BlurView } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Bg = memo(
  ({ style, src }) => {
    return <BlurView style={style} tint={_.select('default', 'dark')} src={src} blurRadius={32} />
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Bg
