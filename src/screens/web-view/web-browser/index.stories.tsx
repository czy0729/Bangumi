/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:30:22
 */
import React from 'react'
import { getStorybookArgs, Page, StorybookList, StorybookSPA, Text } from '@components'
import { _ } from '@stores'

const Component = () => (
  <Page>
    <Text style={_.mt.center} align='center'>
      网页端暂不支持此功能 (Webview)
    </Text>
  </Page>
)

export default {
  title: 'screens/WebBrowser',
  component: Component
}

export const WebBrowser = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('WebBrowser')} />
    </StorybookList>
  </StorybookSPA>
)
