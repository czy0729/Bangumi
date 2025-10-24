/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 08:29:09
 */
import React from 'react'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import ParallaxImage from './parallax-image'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ParallaxImageWrap({ scrollY, fixed }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
}

export default ParallaxImageWrap
