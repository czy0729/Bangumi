/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:47:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-11 19:47:20
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
  title: 'screens/Wiki',
  component: Component
}

export const Wiki = () => {
  const route = getStorybookRoute('Wiki')
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
