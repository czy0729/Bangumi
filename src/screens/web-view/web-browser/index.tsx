/*
 * @Author: czy0729
 * @Date: 2022-12-30 20:54:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-30 21:28:19
 */
import React from 'react'
import { Header } from '@components'
import WebView from '@components/@/web-view'

const WebBrowser = ({ route }) => {
  const { url, title } = route.params
  if (!url) return null

  return (
    <>
      <Header title={title || '浏览器'} />
      <WebView
        originWhitelist={['*']}
        source={{
          uri: url
        }}
      />
    </>
  )
}

export default WebBrowser
