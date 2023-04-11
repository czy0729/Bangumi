/*
 * @Author: czy0729
 * @Date: 2023-04-09 09:20:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:24:15
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
  title: 'screens/Game',
  component: Component
}

export const Game = () => {
  const route = getStorybookRoute('Game')
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
