/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 11:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_OBJECT, HOST_CDN, IMG_DEFAULT } from '@constants'
import { Component } from '../component'
import { Touchable } from '../touchable'
import AvatarImage from './avatar-image'
import { useAvatar, useAvatarLongPress, useAvatarPress } from './hooks'
import { fixedAll, fixedHD, fixedSize, getAvatar, getRadius } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as AvatarProps } from './types'
export type { AvatarProps }

/** 头像 */
export const Avatar = observer(
  ({
    navigation,
    style,
    userId,
    name,
    src,
    size = 40,
    placeholder,
    round,
    radius = true,
    borderWidth,
    borderColor = _.colorBorder,
    fallbackSrc,
    priority,
    skeleton,
    skeletonType,
    event = FROZEN_OBJECT,
    params = FROZEN_OBJECT,
    onPress,
    onLongPress
  }: AvatarProps) => {
    r(COMPONENT)

    const url = useAvatar(src, userId)

    const styles = memoStyles()

    // 派生值直接计算, 依赖 observer 追踪 mobx 变化自动重渲染
    const avatarSize = size < 48 ? _.r(size) : size
    const avatarSrc = fixedAll(getAvatar(url) || IMG_DEFAULT, avatarSize)
    const avatarRadius = getRadius(radius, round, avatarSize)
    const fallbackSrcFixed = fixedHD(fixedSize(String(fallbackSrc || src)))

    const { canPress, handlePress } = useAvatarPress({
      onPress,
      navigation,
      userId,
      event,
      src: avatarSrc,
      name,
      params
    })

    const handleLongPress = useAvatarLongPress(onLongPress, userId, name)

    // style 依赖 mobx（systemStore.dev），不能缓存
    const mergeStyle = stl(
      style,
      systemStore.dev && typeof avatarSrc === 'string' && avatarSrc.includes(HOST_CDN) && styles.dev
    )

    const el = (
      <AvatarImage
        src={avatarSrc}
        fallbackSrc={fallbackSrcFixed}
        priority={priority}
        skeleton={skeleton}
        skeletonType={skeletonType}
        size={avatarSize}
        radius={avatarRadius}
        border={borderColor}
        borderWidth={borderWidth}
        placeholder={placeholder}
        style={mergeStyle}
      />
    )

    if (canPress || handleLongPress) {
      return (
        <Component id='component-avatar' data-type='press' data-user-id={userId}>
          <Touchable
            animate
            scale={0.88}
            onPress={canPress ? handlePress : undefined}
            onLongPress={handleLongPress}
          >
            {el}
          </Touchable>
        </Component>
      )
    }

    return <Component id='component-avatar'>{el}</Component>
  }
)

export default Avatar
