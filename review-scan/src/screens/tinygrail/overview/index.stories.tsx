/*
 * @Author: czy0729
 * @Date: 2023-04-12 11:02:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 11:04:23
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/TinygrailOverview',
  component: Component
}

export const TinygrailOverview = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('TinygrailOverview')} />
    </StorybookList>
  </StorybookSPA>
)
