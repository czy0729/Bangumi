/*
 * @Author: czy0729
 * @Date: 2022-12-30 20:54:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-13 08:02:57
 */
import React, { useState } from 'react'
import { Flex, Header } from '@components'
import WebView from '@components/@/web-view'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'

const WebBrowser = ({ route }) => {
  const [key, setKey] = useState(0)

  const { url, title } = route.params
  if (!url) return null

  return (
    <>
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
      <WebView
        key={String(key)}
        originWhitelist={['*']}
        source={{
          uri: url
        }}
      />
    </>
  )
}

export default WebBrowser
