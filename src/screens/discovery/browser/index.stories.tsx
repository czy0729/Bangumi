/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:27:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 02:50:26
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Browser as Component } from '@screens'

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
