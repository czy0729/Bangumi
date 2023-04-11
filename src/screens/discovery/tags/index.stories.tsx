/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:43:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:29:43
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
  title: 'screens/Tags',
  component: Component
}

export const Tags = () => {
  const route = getStorybookRoute('Tags')
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
