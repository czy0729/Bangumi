/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:19:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-18 06:00:00
 */
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { ParallaxBgImage, SensorParallaxCard } from '@_'
import { systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Bg({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  const styles = memoStyles()

  const elImage = (
    <ParallaxBgImage
      src={$.imageSource.uri}
      fallbackSrc={$.usersInfo.avatar?.large}
      blurRadius={$.blurRadius}
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
}

export default observer(Bg)
