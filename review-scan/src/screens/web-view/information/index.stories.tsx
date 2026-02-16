/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:19:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:29:43
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Information as Component } from '@screens'

export default {
  title: 'screens/Information',
  component: Component
}

export const Information = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Information')} />
    </StorybookList>
  </StorybookSPA>
)
