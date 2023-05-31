/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 20:43:52
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Qiafan',
  component: Component
}

export const Qiafan = () => (
  <StorybookSPA>
    <StorybookList
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        // @ts-expect-error
        overflowY: 'scroll'
      }}
    >
      <Component {...getStorybookArgs('Qiafan')} />
    </StorybookList>
  </StorybookSPA>
)
