/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:54:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:56:28
 */
import React from 'react'
import { Page, StorybookList, StorybookSPA, Text, getStorybookArgs } from '@components'
import { _ } from '@stores'

const Component = () => (
  <Page>
    <Text style={_.mt.center} align='center'>
      网页端暂不支持此功能 (年鉴)
    </Text>
  </Page>
)

export default {
  title: 'screens/Award',
  component: Component
}

export const Award = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Award')} />
    </StorybookList>
  </StorybookSPA>
)
