/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-06 06:14:53
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/SMB',
  component: Component
}

export const SMB = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('SMB')} />
    </StorybookList>
  </StorybookSPA>
)
