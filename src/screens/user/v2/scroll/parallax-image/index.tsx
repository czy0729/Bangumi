/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:17:17
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _, systemStore, useStore } from '@stores'
import ParallaxImage from './parallax-image'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ParallaxImageWrap({ scrollY, fixed }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { id, avatar, nickname, username } = $.usersInfo

  return (
    <ParallaxImage
      navigation={navigation}
      themeStyles={memoStyles()}
      parallaxImageHeight={_.parallaxImageHeight}
      avatar={avatar}
      fixed={fixed}
      id={id}
      myUserId={$.myUserId}
      nickname={nickname}
      paramsUserId={$.params.userId}
      scrollY={scrollY}
      src={$.avatar || avatar.large}
      userId={$.userId}
      username={username}
      userSensor={systemStore.setting.userSensor}
    />
  )
}

export default observer(ParallaxImageWrap)
