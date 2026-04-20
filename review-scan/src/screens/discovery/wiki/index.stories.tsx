/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:17:45
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Wiki as Component } from '@screens'

export default {
  title: 'screens/Wiki',
  component: Component
}

export const Wiki = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Wiki')} />
    </StorybookList>
  </StorybookSPA>
)
