/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:11:35
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Recommend as Component } from '@screens'

export default {
  title: 'screens/Recommend',
  component: Component
}

export const Recommend = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Recommend')} />
    </StorybookList>
  </StorybookSPA>
)
