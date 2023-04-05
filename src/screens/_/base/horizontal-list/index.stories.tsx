/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:35:16
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { _ } from '@stores'
import { HorizontalList, HorizontalListProps } from './index'
import { props } from './index.mock'

export default {
  title: 'base/HorizontalList',
  component: HorizontalList
}

export const Component = (args: HorizontalListProps) => (
  <StorybookPage style={_.container.wind}>
    <HorizontalList {...args} />
  </StorybookPage>
)

Component.args = props
