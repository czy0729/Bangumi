/*
 * @Author: czy0729
 * @Date: 2024-08-06 03:16:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:17:03
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { VIB as Component } from '@screens'

export default {
  title: 'screens/VIB',
  component: Component
}

export const VIB = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('VIB')} />
    </StorybookList>
  </StorybookSPA>
)
