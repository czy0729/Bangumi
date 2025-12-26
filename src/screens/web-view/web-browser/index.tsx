/*
 * @Author: czy0729
 * @Date: 2022-12-30 20:54:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:44:46
 */
import React, { useCallback, useState } from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'

import { usePreventBack } from '@utils/hooks'
import Notice from './component/notice'
import WebView from './component/webview'
import Header from './header'
import { SCRIPTS } from './ds'

import type { Props } from './types'

let show = true

/** 浏览器 */
const WebBrowser = ({ route }: Props) => {
  const [key, setKey] = useState(0)
  const [showDesc, setShowDesc] = useState(show)
  const { url, title, desc, injectedViewport, gestureEnabled = true } = route.params

  const handleClose = useCallback(() => {
    setShowDesc(false)
    show = false
  }, [])
  const handleRefresh = useCallback(() => {
    setKey(key + 1)
  }, [key])

  usePreventBack({
    enabled: !gestureEnabled
  })

  if (!url) return null

  return (
    <Component id='screen-web-browser'>
      <Page>
        <HeaderPlaceholder />
        {showDesc && <Notice value={desc} onClose={handleClose} />}
        <WebView
          key={String(key)}
          uri={url}
          injectedJavaScript={injectedViewport ? SCRIPTS.injectedViewport : undefined}
        />
        <Header title={title} url={url} onRefresh={handleRefresh} />
      </Page>
    </Component>
  )
}

export default WebBrowser
