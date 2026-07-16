/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 06:17:10
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Zone as Component } from '@screens'

export default {
  title: 'screens/Zone',
  component: Component
}

export const Zone = () => (
  <StorybookSPA>
    <StorybookList
      style={{
        // @ts-expect-error
        overflowY: 'scroll'
      }}
    >
      <Component {...getStorybookArgs('Zone')} />
    </StorybookList>
  </StorybookSPA>
)
