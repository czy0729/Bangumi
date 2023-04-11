/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:19:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:20:17
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
  title: 'screens/Information',
  component: Component
}

export const Information = () => {
  const route = getStorybookRoute('Information')
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
