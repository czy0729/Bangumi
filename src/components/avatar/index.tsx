/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:36:22
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { HOST_CDN, IMG_DEFAULT, IMG_EMPTY, IMG_EMPTY_DARK } from '@constants'
import { Component } from '../component'
import { Image } from '../image'
import { Squircle } from '../squircle'
import { Touchable } from '../touchable'
import { useAvatar } from './hooks'
import { fixedAll, fixedHD, fixedSize, getAvatar, getOnPress, getRadius } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as AvatarProps } from './types'

export { AvatarProps }

/** 头像 */
export const Avatar = ({
  style,
  navigation,
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
  skeletonType,
  event = {},
  params = {},
  onPress,
  onLongPress
}: AvatarProps) => {
  r(COMPONENT)

  const { url, isFromApi } = useAvatar(src, userId)

  return useObserver(() => {
    const styles = memoStyles()
    const avatarSize = _.r(size)
    const avatarSrc = fixedAll(getAvatar(url) || IMG_DEFAULT, avatarSize)
    const avatarRadius = getRadius(radius, round, avatarSize)
    const avatarOnPress = getOnPress(onPress, {
      navigation,
      userId,
      event,
      src: avatarSrc,
      name,
      params
    })

    const passProps = {
      key: typeof avatarSrc === 'string' ? avatarSrc : 'avatar',
      style: stl(
        style,
        systemStore.dev &&
          typeof avatarSrc === 'string' &&
          avatarSrc.includes(HOST_CDN) &&
          styles.dev
      ),
      src: isFromApi ? _.select(IMG_EMPTY, IMG_EMPTY_DARK) : avatarSrc,
      fallbackSrc: fixedHD(fixedSize(String(fallbackSrc || src))),
      priority,
      skeletonType,
      size: avatarSize,
      border: borderColor,
      borderWidth,
      placeholder
    }

    const el = avatarRadius ? (
      <Squircle width={avatarSize} height={avatarSize} radius={avatarRadius}>
        <Image {...passProps} border={0} />
      </Squircle>
    ) : (
      <Image {...passProps} radius={avatarRadius} />
    )

    if (avatarOnPress || onLongPress) {
      return (
        <Component id='component-avatar' data-type='press'>
          <Touchable animate scale={0.88} onPress={avatarOnPress} onLongPress={onLongPress}>
            {el}
          </Touchable>
        </Component>
      )
    }

    return <Component id='component-avatar'>{el}</Component>
  })
}

export default Avatar
