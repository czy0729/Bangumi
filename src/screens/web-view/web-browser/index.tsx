/*
 * @Author: czy0729
 * @Date: 2022-12-30 20:54:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 内置浏览器: 说明条 + WebView, 支持代理地址还原与刷新
 */
import { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { usePreventBack } from '@utils/hooks'
import { applyProxy, restoreNativeUrl } from '@utils/proxy'
import Notice from './component/notice'
import WebView from './component/webview'
import Header from './header'
import { SCRIPTS } from './ds'

import type { Props } from './types'

/** 本次会话是否还需要展示说明 */
let show = true

/** 浏览器 */
function WebBrowser({ route }: Props) {
  const [key, setKey] = useState(0)
  const [showDesc, setShowDesc] = useState(show)

  const { url: _url, title, desc, injectedViewport, gestureEnabled = true } = route.params
  const url = restoreNativeUrl(applyProxy(_url).url)

  const handleClose = useCallback(() => {
    setShowDesc(false)
    show = false
  }, [])
  const handleRefresh = useCallback(() => {
    setKey(value => value + 1)
  }, [])

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

export default observer(WebBrowser)
