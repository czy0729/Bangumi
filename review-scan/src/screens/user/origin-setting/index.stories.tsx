/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:26:06
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { OriginSetting as Component } from '@screens'

export default {
  title: 'screens/OriginSetting',
  component: Component
}

export const OriginSetting = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('OriginSetting')} />
    </StorybookList>
  </StorybookSPA>
)
