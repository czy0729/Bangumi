/*
 * @Author: czy0729
 * @Date: 2026-04-30 00:10:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 00:28:51
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { systemStore } from '@stores'
import {
  appNavigate,
  cheerio,
  feedback,
  fixedBgmUrl,
  getStorage,
  info,
  open,
  setStorage
} from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import { applyProxy } from '@utils/proxy'
import { HOST, WEB } from '@constants'
import { getAwardUrl, getAwardYear, transformAwardHTML } from './utils'
import { NAMESPACE } from './ds'

import type { NavigationProps } from '@types'
import type { Params } from './types'
const HTML_CACHE: Record<string, string> = {}

/** 年鉴页面逻辑 */
export function useAwardPage({ navigation, route }: NavigationProps<Params>) {
  const [loading, setLoading] = useState(true)
  const [html, setHtml] = useState('')
  const [redirectCount] = useState(0)

  const uri = route?.params?.uri || ''
  const year = useMemo(() => getAwardYear(uri), [uri])
  const proxyBaseUrl = useMemo(() => applyProxy(HOST).url, [])
  const source = useMemo(
    () => ({
      html,
      baseUrl: proxyBaseUrl
    }),
    [html, proxyBaseUrl]
  )

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [])

  const handleError = useCallback(() => {
    navigation.goBack()
    info('网络似乎出了点问题，请重试')

    t('年鉴.错误', { uri })
  }, [navigation, uri])

  const handleOpen = useCallback(() => {
    open(uri)

    t('年鉴.浏览器打开', { uri })
  }, [uri])

  const handleDirect = useCallback(
    (data: { href?: string; innerHTML?: string; nextInnerHTML?: string }) => {
      if (!data?.href) return

      const { href, innerHTML, nextInnerHTML } = data
      const params: any = {}

      if (href.includes('/subject/')) {
        if (innerHTML && !systemStore.isHostProxy) {
          params._image = fixedBgmUrl(cheerio(innerHTML)('img').attr('src') || '')
        }

        if (nextInnerHTML) {
          const $ = cheerio(nextInnerHTML)
          params._jp = $('.rate-title').text().trim() || $('.title').text().trim()
          params._cn = $('.rate-subtitle').text().trim() || $('.subtitle').text().trim()
        }
      }

      const event = {
        id: '年鉴.跳转',
        data: { year }
      } as const

      feedback(true)
      appNavigate(href, navigation, params, event)
    },
    [navigation, year]
  )

  const handleMessage = useCallback(
    async (event: any) => {
      try {
        const { type, data } = JSON.parse(event.nativeEvent.data)

        if (type === 'onclick') {
          handleDirect(data)
        }
      } catch {
        handleError()
      }
    },
    [handleDirect, handleError]
  )

  const handleFetch = useCallback(async () => {
    try {
      const url = getAwardUrl(uri, year)
      const rawHtml = await fetchHTML({ url })
      const transformed = transformAwardHTML(rawHtml, year)

      HTML_CACHE[uri] = transformed
      setHtml(transformed)

      if (WEB) {
        setStorage(`${NAMESPACE}|html|${uri}`, transformed)
      }
    } catch {
      handleError()
    }
  }, [uri, year, handleError])

  useEffect(() => {
    const cache = HTML_CACHE[uri]
    if (cache) {
      setHtml(cache)
      handleLoad()
      return
    }

    if (WEB) {
      getStorage(`${NAMESPACE}|html|${year}`).then((cache: string) => {
        if (cache) {
          setHtml(cache)
          handleLoad()
        } else {
          handleFetch()
        }
      })
    } else {
      handleFetch()
    }

    const timer = setTimeout(() => {
      handleLoad()
    }, 3000)

    return () => clearTimeout(timer)
  }, [uri, year, handleFetch, handleLoad])

  return {
    loading,
    redirectCount,
    year,
    html,
    source,
    handleOpen,
    handleLoad,
    handleError,
    handleMessage
  }
}
