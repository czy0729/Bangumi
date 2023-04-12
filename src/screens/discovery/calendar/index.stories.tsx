/*
 * @Author: czy0729
 * @Date: 2023-04-11 17:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:57:48
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Calendar',
  component: Component
}

export const Calendar = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Calendar')} />
    </StorybookList>
  </StorybookSPA>
)
