/*
 * @Author: czy0729
 * @Date: 2026-03-12 20:34:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 20:46:49
 */
import React from 'react'
import { Animated } from 'react-native'
import { Component } from '@components'
import { SensorParallaxCard } from '@_'
import { systemStore, useStore } from '@stores'
import { getBlurRadius, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { TEXT_ONLY } from '@constants'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Bg({ style, fixed }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    if (TEXT_ONLY) {
      return <Animated.View style={[styles.parallaxBg, style]} pointerEvents='none' />
    }

    let uri = $.bg || $.avatar || $.usersInfo.avatar?.large
    if (typeof uri === 'string') uri = uri.replace('http://', 'https://')

    const elImage = (
      <Animated.Image
        style={styles.parallaxImage}
        source={{ uri }}
        blurRadius={getBlurRadius(uri, $.bg, $.usersInfo.avatar?.large)}
      />
    )

    return (
      <Component id='screen-user-parallax-image-bg'>
        <Animated.View style={stl(styles.parallaxBg, style)} pointerEvents='none'>
          {systemStore.setting.userSensor ? (
            <SensorParallaxCard enabled={!fixed}>{elImage}</SensorParallaxCard>
          ) : (
            elImage
          )}
        </Animated.View>
      </Component>
    )
  })
}

export default Bg
