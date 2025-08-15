/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:25:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:29:52
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { ErrorBoundary as Component, ErrorBoundaryProps as Props } from './index'

export default {
  title: 'components/ErrorBoundary',
  component: Component
}

export const ErrorBoundary = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)

ErrorBoundary.args = {
  error: new Error('JS Exception Test.')
}
