/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:18:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 02:47:32
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { DiscoveryBlog as Component } from '@screens'

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
