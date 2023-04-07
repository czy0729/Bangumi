/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:03:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:03:54
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Pagination, PaginationProps } from './index'

export default {
  title: 'components/Pagination',
  component: Pagination
}

export const Component = (args: PaginationProps) => (
  <StorybookPage>
    <Pagination {...args} />
  </StorybookPage>
)

Component.args = {
  input: 3
}
