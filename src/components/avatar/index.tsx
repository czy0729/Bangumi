/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 06:44:25
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
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
    event = {},
    params = {},
    onPress,
    onLongPress
  }: AvatarProps) => {
    r(COMPONENT)

    const { url } = useAvatar(src, userId)

    const styles = memoStyles()

    // 缓存计算值（仅依赖 props）
    const avatarSize = useMemo(() => (size < 48 ? _.r(size) : size), [size])
    const avatarSrc = useMemo(
      () => fixedAll(getAvatar(url) || IMG_DEFAULT, avatarSize),
      [url, avatarSize]
    )
    const avatarRadius = useMemo(
      () => getRadius(radius, round, avatarSize),
      [radius, round, avatarSize]
    )

    // 缓存点击回调
    const avatarOnPress = useMemo(
      () =>
        getOnPress(onPress, {
          navigation,
          userId,
          event,
          src: avatarSrc,
          name,
          params
        }),
      [onPress, navigation, userId, event, avatarSrc, name, params]
    )

    // 缓存 fallbackSrc 计算
    const fallbackSrcFixed = useMemo(
      () => fixedHD(fixedSize(String(fallbackSrc || src))),
      [fallbackSrc, src]
    )

    // 缓存 key
    const key = useMemo(() => (typeof avatarSrc === 'string' ? avatarSrc : 'avatar'), [avatarSrc])

    // style 依赖 mobx（systemStore.dev），不能缓存
    const mergeStyle = stl(
      style,
      systemStore.dev && typeof avatarSrc === 'string' && avatarSrc.includes(HOST_CDN) && styles.dev
    )

    // 缓存 passProps（不含 style，style 单独传）
    const passProps = useMemo(
      () => ({
        src: avatarSrc,
        fallbackSrc: fallbackSrcFixed,
        priority,
        skeleton,
        skeletonType,
        size: avatarSize,
        border: borderColor,
        borderWidth,
        placeholder
      }),
      [
        avatarSrc,
        fallbackSrcFixed,
        priority,
        skeleton,
        skeletonType,
        avatarSize,
        borderColor,
        borderWidth,
        placeholder
      ]
    )

    // 长按回调（依赖 mobx，不能缓存）
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

    const el = avatarRadius ? (
      <Squircle width={avatarSize} height={avatarSize} radius={avatarRadius}>
        <Image {...passProps} style={mergeStyle} key={key} border={0} />
      </Squircle>
    ) : (
      <Image {...passProps} style={mergeStyle} key={key} radius={avatarRadius} />
    )

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
  }
)

export default Avatar
