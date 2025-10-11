/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:49:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:30:09
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Tips as Component } from '@screens'

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
