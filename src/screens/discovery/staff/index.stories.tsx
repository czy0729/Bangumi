/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:56:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:27:48
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Staff',
  component: Component
}

export const Staff = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Staff')} />
    </StorybookList>
  </StorybookSPA>
)
