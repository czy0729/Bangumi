/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:18:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:27:10
 */
import React from 'react'
import {
  StorybookSPA,
  StorybookList,
  StorybookNavigation,
  getStorybookRoute
} from '@components'
import { urlStringify } from '@utils'
import Component from './index'

export default {
  title: 'screens/DiscoveryBlog',
  component: Component
}

export const DiscoveryBlog = () => {
  const route = getStorybookRoute('DiscoveryBlog')
  return (
    <StorybookSPA>
      <StorybookList>
        <Component
          key={urlStringify(route.params)}
          navigation={StorybookNavigation}
          route={route}
        />
      </StorybookList>
    </StorybookSPA>
  )
}
