/*
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-13 14:58:38
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Component, Page } from '@components'
import { appNavigate, cheerio, fixedBgmUrl, getStorage, info, open, setStorage, stl } from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST, WEB } from '@constants'
import Extra from './component/extra'
import Loading from './component/loading'
import WebView from './component/web-view'
import { getAwardUrl, getAwardYear, transformAwardHTML } from './utils'
import { NAMESPACE } from './ds'
import { styles } from './styles'

import type { Props } from './types'

const HTML_CACHE: Record<string, string> = {}

function Award(props: Props) {
  const { navigation, route } = props

  const [loading, setLoading] = useState(true)
  const [html, setHtml] = useState('')
  const [redirectCount] = useState(0)

  const uri = route?.params?.uri || ''
  const year = useMemo(() => getAwardYear(uri), [uri])
  const source = useMemo(
    () => ({
      html,
      baseUrl: HOST
    }),
    [html]
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
        if (innerHTML) {
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

  return useObserver(() => (
    <Component id='screen-award'>
      <Page style={stl(styles.container, year == '2025' && styles.container2025)}>
        {loading && <Loading redirectCount={redirectCount} onOpen={handleOpen} />}

        {!!html && (
          <WebView
            year={year}
            source={source}
            onLoad={handleLoad}
            onError={handleError}
            onMessage={handleMessage}
          />
        )}

        <Extra year={year} />
      </Page>
    </Component>
  ))
}

export default Award
