/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:51:59
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { ADV as Component } from '@screens'

export default {
  title: 'screens/ADV',
  component: Component
}

export const ADV = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('ADV')} />
    </StorybookList>
  </StorybookSPA>
)
