/*
 * @Author: czy0729
 * @Date: 2023-12-11 15:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 11:00:00
 */
import { useCallback, useState } from 'react'
import { systemStore, tinygrailStore } from '@stores'
import { navigationReference } from '@utils'
import CacheManager from '@utils/cache-manager'
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
      initUrl = CacheManager.get(key) || src
    } else {
      initUrl = src
    }
    if (typeof src === 'string' && src.indexOf('//') === 0) initUrl = `https:${initUrl}`

    return initUrl
  })
  const isFromApi = typeof url === 'string' && url.includes(API_V0)

  useMount(() => {
    if (!isFromApi) return

    if (CacheManager.has(key)) {
      setUrl(CacheManager.get(key))
      return
    }

    setTimeout(() => {
      ;(async () => {
        let responseURL = await head(url)
        if (typeof responseURL !== 'string') responseURL = url

        setUrl(CacheManager.set(key, responseURL))
      })()
    }, 0)
  })

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
