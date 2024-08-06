/*
 * @Author: czy0729
 * @Date: 2023-04-11 17:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 02:52:09
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Calendar as Component } from '@screens'

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
