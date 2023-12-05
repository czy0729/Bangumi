/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-11 21:12:37
 */
import React from 'react'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import ParallaxImage from './parallax-image'
import { memoStyles } from './styles'

export default obc(({ scrollY, fixed }, { $, navigation }: Ctx) => {
  rerender('User.ParallaxImage')

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
})
