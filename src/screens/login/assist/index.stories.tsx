/*
 * @Author: czy0729
 * @Date: 2023-06-27 00:27:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-27 00:28:20
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
