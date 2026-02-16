/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:03:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:03:54
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Pagination as Component, PaginationProps as Props } from './index'

export default {
  title: 'components/Pagination',
  component: Component
}

export const Pagination = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)

Pagination.args = {
  input: 3
}
