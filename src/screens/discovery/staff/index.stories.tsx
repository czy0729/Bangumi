/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:56:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:30:16
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
  title: 'screens/Staff',
  component: Component
}

export const Staff = () => {
  const route = getStorybookRoute('Staff')
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
