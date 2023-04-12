/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 19:19:13
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Voice from './voice'
import { memoStyles } from './styles'

export default obc(({ style }, { $, navigation }: Ctx) => {
  // global.rerender('Mono.Voice')

  if (!$.voices.length) return null

  return (
    <Voice
      styles={memoStyles()}
      navigation={navigation}
      style={style}
      voices={$.voices}
    />
  )
})
