/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:41:38
 */
import React from 'react'
import { Page, StorybookList, StorybookSPA, Text, getStorybookArgs } from '@components'
import { _ } from '@stores'

const Component = () => (
  <Page>
    <Text style={_.mt.center} align='center'>
      网页端暂不支持此功能 (SMB本地管理)
    </Text>
  </Page>
)

export default {
  title: 'screens/SMB',
  component: Component
}

export const SMB = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('SMB')} />
    </StorybookList>
  </StorybookSPA>
)
