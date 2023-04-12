/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:30:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-12 10:30:44
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
