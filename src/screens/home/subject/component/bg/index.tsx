/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 23:00:05
 */
import React from 'react'
import { View } from 'react-native'
import { getCover400, x18 } from '@utils'
import { obc } from '@utils/decorators'
import { IOS, TEXT_ONLY } from '@constants'
import { Ctx } from '../../types'
import Bg from './bg'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function BgWrap(props, { $ }: Ctx) {
  const styles = memoStyles()
  if (TEXT_ONLY) {
    if (IOS) return null

    return <View style={styles.bg} />
  }

  const cdn = !x18($.subjectId)
  const src = cdn
    ? getCover400($.coverPlaceholder || $.subject.images?.common || $.cover)
    : $.subject.images?.common
  if (typeof src !== 'string') return <View style={styles.bg} />

  return <Bg style={styles.bg} src={src} cdn={cdn} />
}

export default obc(BgWrap, COMPONENT)
