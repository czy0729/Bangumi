/*
 * @Author: czy0729
 * @Date: 2023-04-11 20:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:21:33
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { LoginV2 as Component } from '@screens'

export default {
  title: 'screens/LoginV2',
  component: Component
}

export const LoginV2 = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('LoginV2')} />
    </StorybookList>
  </StorybookSPA>
)
