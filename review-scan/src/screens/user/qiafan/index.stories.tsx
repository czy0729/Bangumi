/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:26:24
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Qiafan as Component } from '@screens'

export default {
  title: 'screens/Qiafan',
  component: Component
}

export const Qiafan = () => (
  <StorybookSPA>
    <StorybookList
      style={{
        // @ts-expect-error
        overflowY: 'scroll'
      }}
    >
      <Component {...getStorybookArgs('Qiafan')} />
    </StorybookList>
  </StorybookSPA>
)
