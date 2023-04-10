/*
 * @Author: czy0729
 * @Date: 2023-04-07 08:10:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 08:33:28
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Text } from '@components/text'
import { WebView as Component } from './index'

export default {
  title: 'components/WebView',
  component: Component
}

export const WebView = () => (
  <StorybookPage>
    <Text>Not supported on web</Text>
  </StorybookPage>
)
