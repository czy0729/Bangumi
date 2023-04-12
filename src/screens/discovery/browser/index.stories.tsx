/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:27:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:57:30
 */
import React from 'react'
import { StorybookList, StorybookSPA, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Browser',
  component: Component
}

export const Browser = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Browser')} />
    </StorybookList>
  </StorybookSPA>
)
