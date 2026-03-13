/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:19:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:00
 */
import React from 'react'
import { Animated } from 'react-native'
import { Component } from '@components'
import { useStore } from '@stores'
import { getBlurRadius, stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Bg({ style }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <Component id='screen-zone-parallax-image-bg'>
      <Animated.Image
        style={stl(styles.parallaxImage, style)}
        source={$.imageSource}
        blurRadius={getBlurRadius($.imageSource.uri, $.bg, $.usersInfo.avatar?.large)}
      />
    </Component>
  )
}

export default ob(Bg)
