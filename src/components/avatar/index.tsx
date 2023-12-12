/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 05:35:34
 */
import React from 'react'
import { observer, useObserver } from 'mobx-react'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { HOST_CDN, IMG_EMPTY_DARK, IMG_EMPTY, IMG_DEFAULT } from '@constants'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { Squircle } from '../squircle'
import { Image } from '../image'
import { fixedAll, fixedHD, fixedSize, getAvatar, getOnPress, getRadius } from './utils'
import { useAvatar } from './hooks'
import { memoStyles } from './styles'
import { Props as AvatarProps } from './types'

export { AvatarProps }

/** 头像 */
export const Avatar = observer(
  ({
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
    event = {},
    params = {},
    onPress,
    onLongPress
  }: AvatarProps) => {
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
            <Touchable
              animate
              scale={0.88}
              onPress={avatarOnPress}
              onLongPress={onLongPress}
            >
              {el}
            </Touchable>
          </Component>
        )
      }

      return <Component id='component-avatar'>{el}</Component>
    })
  }
)
