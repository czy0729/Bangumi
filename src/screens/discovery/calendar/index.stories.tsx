/*
 * @Author: czy0729
 * @Date: 2023-04-11 17:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:29:09
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
  title: 'screens/Calendar',
  component: Component
}

export const Calendar = () => {
  const route = getStorybookRoute('Calendar')
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
