/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 09:43:59
 */
import React from 'react'
import { View } from 'react-native'
import { getCover400 } from '@utils'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { IOS, TEXT_ONLY } from '@constants'
import { Ctx } from '../types'
import Bg from './bg'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  rerender('Subject.Bg')

  const styles = memoStyles()
  if (TEXT_ONLY) {
    if (IOS) return null
    return <View style={styles.bg} />
  }

  const { images } = $.subject
  const src = $.coverPlaceholder || images?.common || $.cover
  if (typeof src !== 'string') return <View style={styles.bg} />

  return <Bg style={styles.bg} src={getCover400(src)} />
})
