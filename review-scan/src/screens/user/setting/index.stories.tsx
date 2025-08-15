/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:26:46
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Setting as Component } from '@screens'

export default {
  title: 'screens/Setting',
  component: Component
}

export const Setting = () => (
  <StorybookSPA>
    <StorybookList>
      {/* @ts-expect-error */}
      <Component {...getStorybookArgs('Setting')} />
    </StorybookList>
  </StorybookSPA>
)
