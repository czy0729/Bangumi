/*
 * @Author: czy0729
 * @Date: 2023-04-05 00:01:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 01:36:30
 */
import React from 'react'
import { StorybookPage, StorybookGrid } from '@components/storybook'
import { ItemCollectionsGrid, ItemCollectionsGridProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemCollectionsGrid',
  component: ItemCollectionsGrid
}

export const Component = (args: ItemCollectionsGridProps) => (
  <StorybookPage>
    <ItemCollectionsGrid {...args} />
  </StorybookPage>
)

Component.args = list[2] as ItemCollectionsGridProps

export const List = () => (
  <StorybookPage>
    <StorybookGrid>
      {list.map(item => (
        <ItemCollectionsGrid key={item.id} {...item} />
      ))}
    </StorybookGrid>
  </StorybookPage>
)
