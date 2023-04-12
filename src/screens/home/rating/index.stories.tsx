/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 01:09:35
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Rating',
  component: Component
}

export const Rating = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Rating')} />
    </StorybookList>
  </StorybookSPA>
)
