/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:26:16
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { PM as Component } from '@screens'

export default {
  title: 'screens/PM',
  component: Component
}

export const PM = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('PM')} />
    </StorybookList>
  </StorybookSPA>
)
