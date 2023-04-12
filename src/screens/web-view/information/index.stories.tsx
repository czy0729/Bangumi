/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:19:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:44:15
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
