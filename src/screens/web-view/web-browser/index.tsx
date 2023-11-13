/*
 * @Author: czy0729
 * @Date: 2022-12-30 20:54:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:30:39
 */
import React, { useState } from 'react'
import { Component, Flex, Header, Text } from '@components'
import WebView from '@components/@/web-view'
import { IconTouchable } from '@_'
import { _, userStore } from '@stores'
import { open } from '@utils'

const SCRIPTS = {
  injectedViewport: `
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName('head')[0].appendChild(meta);
  `
} as const

let show = true

const WebBrowser = ({ route }) => {
  const [key, setKey] = useState(0)
  const [showDesc, setShowDesc] = useState(show)
  const { url, title, desc, injectedViewport } = route.params
  if (!url) return null

  return (
    <Component id='screen-web-browser'>
      <Header
        title={title || '浏览器'}
        headerRight={() => (
          <Flex>
            <IconTouchable
              name='md-refresh'
              color={_.colorTitle}
              onPress={() => setKey(key + 1)}
            />
            <IconTouchable
              style={_.ml.xs}
              name='md-open-in-new'
              color={_.colorTitle}
              size={18}
              onPress={() => {
                open(url)
              }}
            />
          </Flex>
        )}
      />
      {!!desc && showDesc && (
        <Flex style={[_.container.wind, _.mb.sm]}>
          <Flex.Item>
            <Text size={12} lineHeight={13} bold>
              {desc}
            </Text>
          </Flex.Item>
          <IconTouchable
            style={_.mr._sm}
            name='md-close'
            size={18}
            color={_.colorDesc}
            onPress={() => {
              setShowDesc(false)
              show = false
            }}
          />
        </Flex>
      )}
      <WebView
        key={String(key)}
        originWhitelist={['*']}
        source={{
          uri: url
        }}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        userAgent={userStore.userCookie.userAgent || undefined}
        injectedJavaScript={injectedViewport ? SCRIPTS.injectedViewport : undefined}
      />
    </Component>
  )
}

export default WebBrowser
