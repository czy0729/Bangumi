/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:17:16
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Wenku as Component } from '@screens'

export default {
  title: 'screens/Wenku',
  component: Component
}

export const Wenku = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Wenku')} />
    </StorybookList>
  </StorybookSPA>
)
