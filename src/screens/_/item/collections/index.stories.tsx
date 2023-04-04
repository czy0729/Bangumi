/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 01:51:38
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemCollections, ItemCollectionsProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemCollections',
  component: ItemCollections
}

export const Component = (args: ItemCollectionsProps) => (
  <StorybookPage>
    <ItemCollections {...args} />
  </StorybookPage>
)

Component.args = list[10] as ItemCollectionsProps

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <ItemCollections key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
