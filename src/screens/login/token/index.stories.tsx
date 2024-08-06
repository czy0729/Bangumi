/*
 * @Author: czy0729
 * @Date: 2023-11-27 16:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:21:26
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { LoginToken as Component } from '@screens'

export default {
  title: 'screens/LoginToken',
  component: Component
}

export const LoginToken = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('LoginToken')} />
    </StorybookList>
  </StorybookSPA>
)
