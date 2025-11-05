/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:22:21
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Board as Component } from '@screens'

export default {
  title: 'screens/Board',
  component: Component
}

export const Board = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Board')} />
    </StorybookList>
  </StorybookSPA>
)
