/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:18:01
 */
import React from 'react'
import { BlurView } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { DEFAULT_PROPS } from './ds'

export default memo(({ style, src }) => {
  global.rerender('Subject.Bg.Main')

  return <BlurView style={style} tint={_.select('default', 'dark')} src={src} />
}, DEFAULT_PROPS)
