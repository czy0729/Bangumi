/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:29:18
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
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        // @ts-expect-error
        overflowY: 'scroll'
      }}
    >
      <Component {...getStorybookArgs('Zone')} />
    </StorybookList>
  </StorybookSPA>
)
