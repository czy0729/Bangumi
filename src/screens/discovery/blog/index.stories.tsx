/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:18:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:57:07
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/DiscoveryBlog',
  component: Component
}

export const DiscoveryBlog = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('DiscoveryBlog')} />
    </StorybookList>
  </StorybookSPA>
)
