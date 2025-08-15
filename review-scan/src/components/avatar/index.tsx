/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:19:24
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { _, systemStore, tinygrailStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { HOST_CDN, IMG_DEFAULT } from '@constants'
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
  skeleton,
  skeletonType,
  event = {},
  params = {},
  onPress,
  onLongPress
}: AvatarProps) => {
  r(COMPONENT)

  const { url } = useAvatar(src, userId)

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
      style: stl(
        style,
        systemStore.dev &&
          typeof avatarSrc === 'string' &&
          avatarSrc.includes(HOST_CDN) &&
          styles.dev
      ),
      src: avatarSrc,
      fallbackSrc: fixedHD(fixedSize(String(fallbackSrc || src))),
      priority,
      skeleton,
      skeletonType,
      size: avatarSize,
      border: borderColor,
      borderWidth,
      placeholder
    } as const
    const key = typeof avatarSrc === 'string' ? avatarSrc : 'avatar'

    const el = avatarRadius ? (
      <Squircle width={avatarSize} height={avatarSize} radius={avatarRadius}>
        <Image {...passProps} key={key} border={0} />
      </Squircle>
    ) : (
      <Image {...passProps} key={key} radius={avatarRadius} />
    )

    let handleLongPress = onLongPress
    if (
      !handleLongPress &&
      userId &&
      systemStore.setting.tinygrail &&
      systemStore.setting.avatarAlertTinygrailAssets
    ) {
      handleLongPress = () => {
        tinygrailStore.alertUserAssets(userId, name)
      }
    }

    if (avatarOnPress || handleLongPress) {
      return (
        <Component id='component-avatar' data-type='press' data-user-id={userId}>
          <Touchable animate scale={0.88} onPress={avatarOnPress} onLongPress={handleLongPress}>
            {el}
          </Touchable>
        </Component>
      )
    }

    return <Component id='component-avatar'>{el}</Component>
  })
}

export default Avatar
