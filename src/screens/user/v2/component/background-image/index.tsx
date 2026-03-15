/*
 * @Author: czy0729
 * @Date: 2026-03-14 05:54:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 17:57:39
 */
import React from 'react'
import { Animated } from 'react-native'
import { Component } from '@components'
import { SensorParallaxCard } from '@_'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function BackgroundImage({ fixed }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const elImage = (
      <Animated.Image style={_.container.fill} source={$.imageSource} blurRadius={$.blurRadius} />
    )

    return (
      <Component id='screen-user-parallax-image-bg'>
        {systemStore.setting.userSensor ? (
          <SensorParallaxCard enabled={!fixed}>{elImage}</SensorParallaxCard>
        ) : (
          elImage
        )}
      </Component>
    )
  })
}

export default BackgroundImage
