/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:30:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:20:41
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Home as Component } from '@screens'

export default {
  title: 'screens/Home',
  component: Component
}

export const Home = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Home')} />
    </StorybookList>
  </StorybookSPA>
)
