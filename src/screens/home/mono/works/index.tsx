/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 19:19:03
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Works from './works'
import { memoStyles } from './styles'

export default obc(({ style }, { $, navigation }: Ctx) => {
  rerender('Mono.Works')

  if (!$.works.length) return null

  return (
    <Works
      navigation={navigation}
      styles={memoStyles()}
      style={style}
      works={$.works}
    />
  )
})
