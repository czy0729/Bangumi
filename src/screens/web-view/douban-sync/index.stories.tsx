/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:29:33
 */
import React from 'react'
import { getStorybookArgs, Page, StorybookList, StorybookSPA, Text } from '@components'
import { _ } from '@stores'

const Component = () => (
  <Page>
    <Text style={_.mt.center} align='center'>
      网页端暂不支持此功能 (豆瓣同步)
    </Text>
  </Page>
)

export default {
  title: 'screens/DoubanSync',
  component: Component
}

export const DoubanSync = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('DoubanSync')} />
    </StorybookList>
  </StorybookSPA>
)
