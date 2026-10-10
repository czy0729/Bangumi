/*
 * @Author: czy0729
 * @Date: 2026-04-30 00:10:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 *
 * 年鉴页面逻辑: 拉取并处理 html, 处理 webview 点击跳转
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { systemStore } from '@stores'
import {
  appNavigate,
  cheerio,
  ensureRecordLimit,
  feedback,
  fixedBgmUrl,
  getStorage,
  info,
  open,
  setStorage
} from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import { applyProxy, restoreNativeUrl } from '@utils/proxy'
import { HOST, WEB } from '@constants'
import { getAwardUrl, getAwardYear, transformAwardHTML } from './utils'
import { EVENT, NAMESPACE } from './ds'

import type { WebViewMessageEvent } from 'react-native-webview'
import type { NavigationProps } from '@types'
import type { MessageData, Params } from './types'

const HTML_CACHE: Record<string, string> = {}

/** 年鉴页面逻辑 */
export function useAwardPage({ navigation, route }: NavigationProps<Params>) {
  const [loading, setLoading] = useState(true)
  const [html, setHtml] = useState('')

  const uri = route?.params?.uri || ''
  const year = useMemo(() => getAwardYear(uri), [uri])
  const proxyBaseUrl = useMemo(() => restoreNativeUrl(applyProxy(HOST).url), [])
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

    t(EVENT.error, { uri })
  }, [navigation, uri])

  const handleOpen = useCallback(() => {
    open(uri)

    t(EVENT.browser, { uri })
  }, [uri])

  const handleDirect = useCallback(
    (data: MessageData) => {
      if (!data?.href) return

      const { href, innerHTML, nextInnerHTML } = data
      const params: Record<string, string> = {}

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
        id: EVENT.id,
        data: { year }
      } as const

      feedback(true)
      appNavigate(href, navigation, params, event)
    },
    [navigation, year]
  )

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.nativeEvent.data) as {
          type?: string
          data?: MessageData
        }

        if (type === 'onclick') {
          handleDirect(data)
        }
      } catch {
        // 忽略非注入脚本的消息与解析失败
        return
      }
    },
    [handleDirect]
  )

  const handleFetch = useCallback(async () => {
    try {
      const url = getAwardUrl(uri, year)
      const rawHtml = await fetchHTML({ url })
      const transformed = transformAwardHTML(rawHtml, year)

      HTML_CACHE[uri] = transformed
      ensureRecordLimit(HTML_CACHE, 3)
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
      getStorage<string>(`${NAMESPACE}|html|${uri}`).then((cache: string) => {
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
    /** 是否显示加载中 */
    loading,

    /** 年份 */
    year,

    /** 处理后的 html */
    html,

    /** webview 源 */
    source,

    /** 使用浏览器打开 */
    handleOpen,

    /** 加载完成 */
    handleLoad,

    /** 加载失败 */
    handleError,

    /** webview 消息 */
    handleMessage
  }
}
