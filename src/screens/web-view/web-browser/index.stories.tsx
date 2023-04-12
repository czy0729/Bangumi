/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:45:35
 */
import React from 'react'
import { Page, StorybookList, StorybookSPA, Text, getStorybookArgs } from '@components'
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
