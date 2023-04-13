/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 17:27:09
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
