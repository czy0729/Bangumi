/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-05 22:26:02
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Subject as Component } from '@screens'

export default {
  title: 'screens/Subject',
  component: Component
}

export const Subject = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Subject')} />
    </StorybookList>
  </StorybookSPA>
)
