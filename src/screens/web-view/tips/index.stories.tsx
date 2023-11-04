/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:49:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-04 05:49:14
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Tips',
  component: Component
}

export const Tips = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Tips')} />
    </StorybookList>
  </StorybookSPA>
)
