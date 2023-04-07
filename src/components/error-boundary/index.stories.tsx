/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:25:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:29:52
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { ErrorBoundary, ErrorBoundaryProps } from './index'

export default {
  title: 'components/ErrorBoundary',
  component: ErrorBoundary
}

export const Component = (args: ErrorBoundaryProps) => (
  <StorybookPage>
    <ErrorBoundary {...args} />
  </StorybookPage>
)

Component.args = {
  error: new Error('JS Exception Test.')
}
