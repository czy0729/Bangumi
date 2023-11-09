/*
 * 头像
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-05 17:30:52
 */
import React, { useState } from 'react'
import { observer, useObserver } from 'mobx-react'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import CacheManager from '@utils/cache-manager'
import { useMount } from '@utils/hooks'
import { HOST_API_V0 } from '@utils/fetch.v0'
import { HOST_CDN, IOS, IMG_EMPTY_DARK, IMG_EMPTY, IMG_DEFAULT } from '@constants'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { Image } from '../image'
import {
  fixedAll,
  fixedHD,
  fixedSize,
  getAvatar,
  getOnPress,
  getRadius,
  head
} from './utils'
import { memoStyles } from './styles'
import { Props as AvatarProps } from './types'

export { AvatarProps }

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
    radius,
    borderWidth,
    borderColor = _.colorBorder,
    fallbackSrc,
    event = {},
    params = {},
    onPress,
    onLongPress
  }: AvatarProps) => {
    const key = `avatar|${userId}`
    let initUrl: any
    if (typeof src === 'string' && src.includes(HOST_API_V0)) {
      initUrl = CacheManager.get(key) || src
    } else {
      initUrl = src
    }
    const [url, setUrl] = useState(initUrl)
    const isFromApi = typeof url === 'string' && url.includes(HOST_API_V0)

    /**
     * 部分头像地址使用了官方用户头像 API, 而 API 是直接跳转后返回图片
     * 这样部分平台下很难缓存, 而且可能会导致大量慢请求, 阻塞整个 APP
     * 所以使用了一些逻辑来消化 API 得到跳转后的具体地址, 然后再正常渲染图片
     */
    useMount(() => {
      if (!isFromApi) return

      if (CacheManager.has(key)) {
        setUrl(CacheManager.get(key))
        return
      }

      setTimeout(() => {
        ;(async () => {
          const responseURL = await head(url)
          setUrl(CacheManager.set(key, responseURL))
        })()
      }, 0)
    })

    return useObserver(() => {
      const styles = memoStyles()
      let _src = getAvatar(url) || IMG_DEFAULT
      const _size = _.r(size)
      const _radius = getRadius(radius, round, _size)
      const _onPress = getOnPress(onPress, {
        navigation,
        userId,
        event,
        src: _src,
        name,
        params
      })

      /**
       * gif 图片不能直接设置 borderRadius, /icon.jpg 实际上根本不是 jpg 而是 gif, 需要再包一层 View
       * @platform android
       */
      if (!IOS && typeof src === 'string' && src.includes('/icon.jpg')) {
        return (
          <Component
            id='component-avatar'
            style={stl(
              styles.avatar,
              {
                width: _size,
                height: _size,
                borderWidth: 0
              },
              style,
              systemStore.setting.avatarRound && {
                borderRadius: _size / 2
              }
            )}
          >
            <Image
              size={_size}
              src={_src}
              radius={_radius}
              placeholder={placeholder}
              fallbackSrc={fallbackSrc || src}
              scale={0.8}
              onPress={_onPress}
              onLongPress={onLongPress}
            />
          </Component>
        )
      }

      _src = fixedAll(_src, _size)
      const isUrl = typeof _src === 'string'
      const passProps = {
        key: isUrl ? _src : 'avatar',
        style: stl(
          style,
          systemStore.state.dev && isUrl && _src.includes(HOST_CDN) && styles.dev
        ),
        size: _size,
        src: isFromApi ? _.select(IMG_EMPTY, IMG_EMPTY_DARK) : _src,
        border: borderColor,
        borderWidth,
        fallbackSrc: fixedHD(fixedSize(String(fallbackSrc || src))),
        placeholder,
        radius: _radius
      }
      const el = <Image {...passProps} />

      if (_onPress || onLongPress) {
        return (
          <Component id='component-avatar'>
            <Touchable
              animate
              scale={0.88}
              onPress={_onPress}
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
