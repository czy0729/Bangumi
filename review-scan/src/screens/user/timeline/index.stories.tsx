/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:28:03
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { UserTimeline as Component } from '@screens'

export default {
  title: 'screens/UserTimeline',
  component: Component
}

export const UserTimeline = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('UserTimeline')} />
    </StorybookList>
  </StorybookSPA>
)
