/* eslint-disable no-useless-escape */
/*
 * @Author: czy0729
 * @Date: 2019-04-13 10:38:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 00:25:42
 */
import React from 'react'
import { WebView as RNWebView } from 'react-native'

export default class WebView extends React.Component {
  ref
  reload = Function.prototype
  goBack = Function.prototype

  render() {
    const { uri, ...other } = this.props
    if (!uri) {
      return null
    }

    return (
      <RNWebView
        ref={ref => {
          if (ref) {
            this.reload = ref.reload
            this.goBack = ref.goBack
          }
        }}
        useWebKit
        thirdPartyCookiesEnabled={false}
        source={{ uri }}
        {...other}
      />
    )
  }
}
