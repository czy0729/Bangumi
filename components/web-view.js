/*
 * @Author: czy0729
 * @Date: 2019-04-13 10:38:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-22 14:26:28
 */
import React from 'react'
import { WebView as RNWebView } from 'react-native'
import KeyboardSpacer from './keyboard-spacer'

export default class WebView extends React.Component {
  ref
  stopLoading = Function.prototype
  reload = Function.prototype
  goBack = Function.prototype

  render() {
    const { uri, ...other } = this.props
    if (!uri) {
      return null
    }

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
