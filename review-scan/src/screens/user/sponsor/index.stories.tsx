/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:27:53
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Sponsor as Component } from '@screens'

export default {
  title: 'screens/Sponsor',
  component: Component
}

export const Sponsor = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Sponsor')} />
    </StorybookList>
  </StorybookSPA>
)
