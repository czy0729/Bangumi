/*
 * @Author: czy0729
 * @Date: 2025-02-21 11:21:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-02-21 11:21:20
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Log as Component } from '@screens'

export default {
  title: 'screens/Log',
  component: Component
}

export const Log = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Log')} />
    </StorybookList>
  </StorybookSPA>
)
