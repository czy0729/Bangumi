/*
 * @Author: czy0729
 * @Date: 2023-12-11 15:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 17:57:03
 */
import { useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import CacheManager from '@utils/cache-manager'
import { HOST_API_V0 } from '@utils/fetch.v0'
import { useMount } from '@utils/hooks'
import { head } from './utils'
import { Props } from './types'

/**
 * 部分头像地址使用了官方用户头像 API，而 API 是直接跳转后返回图片。
 * 这样部分平台下很难缓存，而且可能会导致大量慢请求，阻塞整个 APP。
 * 所以使用了一些逻辑来消化 API 得到跳转后的具体地址，然后再正常渲染图片。
 */
export function useAvatar(src: Props['src'], userId: Props['userId']) {
  const key = `avatar|${userId}`

  let initUrl: string | ImageSourcePropType
  if (typeof src === 'string' && src.includes(HOST_API_V0)) {
    initUrl = CacheManager.get(key) || src
  } else {
    initUrl = src
  }
  if (typeof src === 'string' && src.indexOf('//') === 0) initUrl = `https:${initUrl}`

  const [url, setUrl] = useState(initUrl)
  const isFromApi = typeof url === 'string' && url.includes(HOST_API_V0)

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

  return {
    url,
    isFromApi
  }
}
