/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:32:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:28:19
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
  title: 'screens/Catalog',
  component: Component
}

export const Catalog = () => {
  const route = getStorybookRoute('Catalog')
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
