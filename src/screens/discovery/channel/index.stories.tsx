/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 02:55:07
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Channel as Component } from '@screens'

export default {
  title: 'screens/Channel',
  component: Component
}

export const Channel = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Channel')} />
    </StorybookList>
  </StorybookSPA>
)
