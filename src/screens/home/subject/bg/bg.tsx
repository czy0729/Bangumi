/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 23:34:14
 */
import React from 'react'
import { BlurView } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'

const defaultProps = {
  style: {},
  src: ''
}

export default memo(({ style, src }) => {
  global.rerender('Subject.Bg.Main')

  return <BlurView style={style} tint={_.select('default', 'dark')} src={src} />
}, defaultProps)
