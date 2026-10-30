/*
 * @Author: czy0729
 * @Date: 2023-12-11 15:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 11:00:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { systemStore, tinygrailStore } from '@stores'
import { navigationReference } from '@utils'
import { cacheManager } from '@utils/cache'
import { useMount } from '@utils/hooks'
import { API_V0 } from '@constants'
import { getOnPress, head } from './utils'

import type { ImageSourcePropType } from 'react-native'
import type { Props } from './types'

/**
 * 部分头像地址使用了官方用户头像 API，而 API 是直接跳转后返回图片。
 * 这样部分平台下很难缓存，而且可能会导致大量慢请求，阻塞整个 APP。
 * 所以使用了一些逻辑来消化 API 得到跳转后的具体地址，然后再正常渲染图片。
 */
export function useAvatar(src: Props['src'], userId: Props['userId']) {
  const key = `avatar|${userId}`

  const [url, setUrl] = useState(() => {
    let initUrl: string | ImageSourcePropType
    if (typeof src === 'string' && src.includes(API_V0)) {
      initUrl = cacheManager.get(key) || src
    } else {
      initUrl = src
    }
    if (typeof src === 'string' && src.indexOf('//') === 0) initUrl = `https:${initUrl}`

    return initUrl
  })
  const isFromApi = typeof url === 'string' && url.includes(API_V0)

  /** 最新外部地址, 供异步回填时判断是否已过期 */
  const srcRef = useRef(src)

  useMount(() => {
    if (!isFromApi) return

    if (cacheManager.has(key)) {
      setUrl(cacheManager.get(key))
      return
    }

    const requestSrc = src
    setTimeout(() => {
      ;(async () => {
        let responseURL = await head(url)
        if (typeof responseURL !== 'string') responseURL = url

        const resolved = cacheManager.set(key, responseURL)

        // 请求期间外部地址已更新, 丢弃本次回填, 避免覆盖新头像
        if (srcRef.current !== requestSrc) return

        setUrl(resolved)
      })()
    }, 0)
  })

  /** 外部头像地址变化时同步 (如用户修改了头像) */
  useEffect(() => {
    srcRef.current = src

    if (typeof src !== 'string') {
      setUrl(src)
      return
    }

    if (!src) {
      setUrl('')
      return
    }

    if (src.includes(API_V0)) {
      const cached = cacheManager.get(key)
      if (cached) setUrl(cached)
      return
    }

    setUrl(src.indexOf('//') === 0 ? `https:${src}` : src)
  }, [key, src])

  return url
}

/**
 * 头像点击逻辑
 * 没有 onPress 且无法跳转到用户空间时, canPress 为 false
 */
export function useAvatarPress({
  onPress,
  navigation,
  userId,
  event,
  src,
  name,
  params
}: Pick<Props, 'onPress' | 'navigation' | 'userId' | 'event' | 'name' | 'params'> & {
  src?: Props['src']
}) {
  const navigationRef = navigation || navigationReference()
  const canPress = !!onPress || (!!navigationRef && !!userId)

  const handlePress = useCallback(() => {
    getOnPress(onPress, {
      navigation,
      userId,
      event,
      src,
      name,
      params: params as Record<string, unknown>
    })?.()
  }, [onPress, navigation, userId, event, src, name, params])

  return {
    canPress,
    handlePress
  }
}

/**
 * 头像长按逻辑
 * 无 onLongPress 且未开启 tinygrail 资产提醒时返回 undefined
 */
export function useAvatarLongPress(
  onLongPress: Props['onLongPress'],
  userId: Props['userId'],
  name: Props['name']
) {
  const canLongPress =
    !!onLongPress ||
    (!!userId && systemStore.setting.tinygrail && systemStore.setting.avatarAlertTinygrailAssets)

  const handleLongPress = useCallback(() => {
    if (userId && systemStore.setting.tinygrail && systemStore.setting.avatarAlertTinygrailAssets) {
      tinygrailStore.alertUserAssets(userId, name)
    }
  }, [userId, name])

  return onLongPress || (canLongPress ? handleLongPress : undefined)
}
