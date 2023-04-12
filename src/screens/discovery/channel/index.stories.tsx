/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:01:54
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Channel',
  component: Component
}

export const Channel = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Channel')} />
    </StorybookList>
  </StorybookSPA>
)
