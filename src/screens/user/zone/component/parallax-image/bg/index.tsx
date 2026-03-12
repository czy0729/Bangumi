/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:19:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 21:14:35
 */
import React from 'react'
import { Animated } from 'react-native'
import { Component } from '@components'
import { SensorParallaxCard } from '@_'
import { systemStore, useStore } from '@stores'
import { getBlurRadius, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Bg({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const elImage = (
      <Animated.Image
        style={styles.parallaxImage}
        source={$.imageSource}
        blurRadius={getBlurRadius($.imageSource.uri, $.bg, $.usersInfo.avatar?.large)}
      />
    )

    return (
      <Component id='screen-zone-parallax-image-bg'>
        <Animated.View style={stl(styles.parallaxBg, style)}>
          {systemStore.setting.zoneSensor ? (
            <SensorParallaxCard>{elImage}</SensorParallaxCard>
          ) : (
            elImage
          )}
        </Animated.View>
      </Component>
    )
  })
}

export default Bg
