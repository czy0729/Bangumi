/*
 * @Author: czy0729
 * @Date: 2026-03-14 05:54:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-18 06:00:00
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { ParallaxBgImage, SensorParallaxCard } from '@_'
import { systemStore, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function BackgroundImage({ fixed }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elImage = (
    <ParallaxBgImage
      src={$.imageSource.uri}
      fallbackSrc={$.usersInfo.avatar?.large}
      blurRadius={$.blurRadius}
    />
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
}

export default observer(BackgroundImage)
