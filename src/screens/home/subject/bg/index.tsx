/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:30:30
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { TEXT_ONLY } from '@constants'
import { Ctx } from '../types'
import Bg from './bg'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  // global.rerender('Subject.Bg')

  if (TEXT_ONLY) return null

  const styles = memoStyles()
  const { images } = $.subject
  const src = $.coverPlaceholder || images?.common
  if (typeof src !== 'string') return <View style={styles.bg} />

  return <Bg style={styles.bg} src={src} />
})
