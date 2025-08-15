/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:27:31
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Smb as Component } from '@screens'

export default {
  title: 'screens/Smb',
  component: Component
}

export const Smb = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Smb')} />
    </StorybookList>
  </StorybookSPA>
)
