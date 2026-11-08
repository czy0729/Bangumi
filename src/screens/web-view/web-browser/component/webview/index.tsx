/*
 * @Author: czy0729
 * @Date: 2025-08-07 00:18:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * WebView: 注入脚本带去重 guard, ref 未就绪时按指数退避重试
 */
import { useCallback, useEffect, useMemo, useRef } from 'react'
import RNWebView from 'react-native-webview'
import { observer } from 'mobx-react'
import { Flex, KeyboardSpacer } from '@components'
import { userStore } from '@stores'
import { r } from '@utils/dev'
import { hashString, wrapWithGuard } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { TimerRef } from '@types'
import type { WebView } from 'react-native-webview'
import type { Props } from './types'

/** 浏览器 WebView */
function WebViewComp({ uri, injectedJavaScript = '' }: Props) {
  r(COMPONENT)

  // WebView<{}>: 显式补齐泛型参数, 保留 ref 的 props 类型
  const webViewRef = useRef<WebView<{}>>(null)
  const pageReadyRef = useRef(false)
  const didTryInjectThisLoadRef = useRef(false)
  const retryTimerRef = useRef<TimerRef>(null)

  // 用脚本内容生成 guard 名称，不同脚本对应不同的 guard
  const guardNameMemo = useMemo(
    () => `__RNWV_INJECTED_${hashString(injectedJavaScript || 'empty')}`,
    [injectedJavaScript]
  )
  const guardedCodeMemo = useMemo(
    () => (injectedJavaScript ? wrapWithGuard(injectedJavaScript, guardNameMemo) : ''),
    [injectedJavaScript, guardNameMemo]
  )

  const clearRetryTimer = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current)
      retryTimerRef.current = null
    }
  }, [])

  const handleInject = useCallback(() => {
    if (!guardedCodeMemo) return true

    const inst = webViewRef.current
    if (!inst) return false

    inst.injectJavaScript(guardedCodeMemo)
    didTryInjectThisLoadRef.current = true
    return true
  }, [guardedCodeMemo])

  const handleTryInjectWithRetry = useCallback(
    (retries = 8, delay = 80) => {
      clearRetryTimer()
      const ok = handleInject()
      if (ok) return
      if (retries <= 0) return

      retryTimerRef.current = setTimeout(() => {
        handleTryInjectWithRetry(retries - 1, Math.min(Math.floor(delay * 1.5), 600))
      }, delay)
    },
    [clearRetryTimer, handleInject]
  )

  // 页面开始加载：重置标记
  const handleLoadStart = useCallback(() => {
    pageReadyRef.current = false
    didTryInjectThisLoadRef.current = false
    clearRetryTimer()
  }, [clearRetryTimer])

  // 页面加载完成：尝试注入（若 ref 不在，带重试）
  const handleLoadEnd = useCallback(() => {
    pageReadyRef.current = true
    if (!didTryInjectThisLoadRef.current) {
      handleTryInjectWithRetry()
    }
  }, [handleTryInjectWithRetry])

  // 当脚本变化且页面已 ready 时，尝试再次注入; 卸载时清理重试定时器
  useEffect(() => {
    if (pageReadyRef.current) {
      didTryInjectThisLoadRef.current = false
      handleTryInjectWithRetry()
    }
    return clearRetryTimer
  }, [clearRetryTimer, guardedCodeMemo, handleTryInjectWithRetry])

  return (
    <Flex.Item>
      <RNWebView
        ref={webViewRef}
        style={styles.webview}
        containerStyle={styles.container}
        originWhitelist={['*']}
        source={{ uri }}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        bounces={false}
        userAgent={userStore.userCookie.userAgent || undefined}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
      <KeyboardSpacer />
    </Flex.Item>
  )
}

export default observer(WebViewComp)
