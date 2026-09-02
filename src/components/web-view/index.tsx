/*
 * @Author: czy0729
 * @Date: 2019-04-13 10:38:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 22:35:51
 */
import { forwardRef, memo, useCallback, useRef } from 'react'
import { WebView as RNWebView } from 'react-native-webview'
import { r } from '@utils/dev'
import { KeyboardSpacer } from '../keyboard-spacer'
import { COMPONENT } from './ds'

import type { Ref } from 'react'
import type { WebViewMessageEvent } from 'react-native-webview'
import type { Props, WebViewMessage, WebViewRef } from './types'
export type { Props as WebViewProps, WebViewRef }

/**
 * @deprecated 通用内置浏览器
 *  - 仅剩授权登录页在用, 其他场景直接使用 react-native-webview
 *  - 注入脚本给页面 postMessage 附加令牌, onMessage 过滤无令牌消息
 */
export const WebView = memo(
  forwardRef(function WebView(
    { uri, onMessage, injectedJavaScriptBeforeContentLoaded, ...other }: Props,
    ref: Ref<WebViewRef>
  ) {
    r(COMPONENT)

    /** 消息令牌, 每实例生成一次, 需与注入脚本内的令牌保持一致 */
    const messageToken = useRef(Math.random().toString(36).slice(2, 10)).current

    const injectedTokenScript = `(function(){
      var __token='${messageToken}';
      var __orig=window.ReactNativeWebView&&window.ReactNativeWebView.postMessage;
      if(__orig){
        window.ReactNativeWebView.postMessage=function(msg){
          try{
            var o=typeof msg==='string'?JSON.parse(msg):msg;
            o.token=__token;
            __orig(JSON.stringify(o));
          }catch(e){__orig(msg)}
        };
      }
    })();`

    const handleOnMessage = useCallback(
      (event: WebViewMessageEvent) => {
        if (!onMessage) return

        try {
          const { token } = JSON.parse(event.nativeEvent.data) as WebViewMessage
          if (token !== messageToken) return
          onMessage(event)
        } catch {}
      },
      [onMessage, messageToken]
    )

    if (!uri) return null

    return (
      <>
        <RNWebView
          ref={ref}
          thirdPartyCookiesEnabled={false}
          source={{ uri }}
          injectedJavaScriptBeforeContentLoaded={`${injectedTokenScript}${
            injectedJavaScriptBeforeContentLoaded || ''
          }`}
          onMessage={handleOnMessage}
          {...other}
        />
        <KeyboardSpacer />
      </>
    )
  })
)

export default WebView
