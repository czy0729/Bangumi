/*
 * @Author: czy0729
 * @Date: 2023-06-27 00:27:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:21:14
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { LoginAssist as Component } from '@screens'

export default {
  title: 'screens/LoginAssist',
  component: Component
}

export const LoginAssist = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('LoginAssist')} />
    </StorybookList>
  </StorybookSPA>
)
