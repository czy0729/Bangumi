/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:58:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:18:17
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Episodes as Component } from '@screens'

export default {
  title: 'screens/Episodes',
  component: Component
}

export const Episodes = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Episodes')} />
    </StorybookList>
  </StorybookSPA>
)
