/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:19:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 21:57:14
 */
import React from 'react'
import { Animated } from 'react-native'
import { getBlurRadius } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Bg({ style }, { $ }: Ctx) {
  const styles = memoStyles()
  const { avatar } = $.usersInfo
  return (
    <Animated.Image
      style={[styles.parallaxImage, style]}
      source={$.imageSource}
      blurRadius={getBlurRadius($.imageSource.uri, $.bg, avatar?.large)}
    />
  )
}

export default obc(Bg)
