/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:51:20
 */
import React from 'react'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ParallaxImage from './parallax-image'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default ob(({ scrollY, fixed }) => {
  const { $, navigation } = useStore<Ctx>()
  const { id, avatar, nickname, username } = $.usersInfo
  return (
    <ParallaxImage
      navigation={navigation}
      themeStyles={memoStyles()}
      parallaxImageHeight={_.parallaxImageHeight}
      avatar={avatar}
      bg={$.bg}
      bgAvatar={$.avatar}
      fixed={fixed}
      id={id}
      myUserId={$.myUserId}
      nickname={nickname}
      paramsUserId={$.params.userId}
      scrollY={scrollY}
      src={$.avatar || avatar.large}
      textType={_.select('plain', 'title')}
      userId={$.userId}
      username={username}
    />
  )
}, COMPONENT)
