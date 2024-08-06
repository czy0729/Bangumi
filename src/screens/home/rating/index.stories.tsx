/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:20:12
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Rating as Component } from '@screens'

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
