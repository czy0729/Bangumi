/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:23:26
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Notify as Component } from '@screens'

export default {
  title: 'screens/Notify',
  component: Component
}

export const Notify = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Notify')} />
    </StorybookList>
  </StorybookSPA>
)
