/*
 * @Author: czy0729
 * @Date: 2023-04-11 01:59:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:07:09
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Discovery as Component } from '@screens'

export default {
  title: 'screens/Discovery',
  component: Component
}

export const Discovery = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Discovery')} />
    </StorybookList>
  </StorybookSPA>
)
