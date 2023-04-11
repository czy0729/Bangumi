/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:08:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:17:25
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
  title: 'screens/Search',
  component: Component
}

export const Search = () => {
  const route = getStorybookRoute('Search')
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
