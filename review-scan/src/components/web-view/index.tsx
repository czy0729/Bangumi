/*
 * @Author: czy0729
 * @Date: 2019-04-13 10:38:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:56:17
 */
import React from 'react'
import RNWebView from '@components/@/web-view'
import { r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { KeyboardSpacer } from '../keyboard-spacer'
import { COMPONENT } from './ds'

/** @deprecated 通用内置浏览器 */
export const WebView = class WebViewComponent extends React.Component<any> {
  ref: any

  stopLoading = FROZEN_FN

  reload = FROZEN_FN

  goBack = FROZEN_FN

  render() {
    r(COMPONENT)

    const { uri, ...other } = this.props as any
    if (!uri) return null

    return (
      <>
        <RNWebView
          ref={ref => {
            if (ref) {
              this.stopLoading = ref.stopLoading
              this.reload = ref.reload
              this.goBack = ref.goBack
            }
          }}
          useWebKit
          thirdPartyCookiesEnabled={false}
          source={{ uri }}
          {...other}
        />
        <KeyboardSpacer />
      </>
    )
  }
}

export default WebView
