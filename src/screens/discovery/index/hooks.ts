/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:12:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 07:11:36
 */
import { useCallback, useRef, useState } from 'react'
import { _, useInitStore } from '@stores'
import { androidDayNightToggle } from '@utils'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import store from './store'

import type { WebView } from 'react-native-webview'
import type { NavigationProps } from '@types'
import type { Ctx } from './types'

const THROTTLE = 240

let lastTime = 0

/** 发现页面逻辑 */
export function useDiscoveryPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $, navigation } = context

  const webviewRef = useRef<WebView>(null)
  const [loaded, setLoaded] = useState(false)

  const handleMessage = useCallback(() => {
    setLoaded(true)
  }, [])
  const handleForwardRef = useCallback((ref: WebView) => {
    webviewRef.current = ref
  }, [])
  const handleTouchMove = useCallback(
    (e: any) => {
      if (!loaded) return

      const now = Date.now()
      if (now - lastTime < THROTTLE) return
      lastTime = now

      const touch = e.nativeEvent.touches?.[0]
      if (!touch || !webviewRef.current) return

      const { pageX, pageY } = touch
      webviewRef.current.injectJavaScript(`
        (function() {
          const shell = document.getElementById('ukagaka_shell')
          if (!shell || !window.CHII_LIVE_2D_MODEL) return

          const rect = shell.getBoundingClientRect()
          const stageWidth = rect.width
          const stageHeight = rect.height

          const localX = ${pageX} - rect.left
          const localY = ${pageY} - rect.top

          // 原比例映射 -1 ~ 1
          let nx = (localX / stageWidth) * 2 - 1
          let ny = -((localY / stageHeight) * 2 - 1)

          // 限制偏移幅度，避免过度左下角
          const MAX_OFFSET = 0.8  // -0.8 ~ 0.8
          nx = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, nx))
          ny = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, ny))

          const model = window.CHII_LIVE_2D_MODEL
          model.internalModel.focusController.targetX = nx
          model.internalModel.focusController.targetY = ny
        })();
      `)
    },
    [loaded]
  )

  usePageLifecycle(
    {
      onEnter() {
        $.init()

        navigation.addListener(`${EVENT_APP_TAB_PRESS}|Discovery`, () => {
          $.onRefreshThenScrollTop()
        })
      },
      onFocus() {
        androidDayNightToggle(_.isDark)
      }
    },
    id
  )

  return {
    ...context,
    loaded,
    handleMessage,
    handleForwardRef,
    handleTouchMove
  }
}
