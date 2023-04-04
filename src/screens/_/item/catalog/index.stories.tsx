/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:47:37
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemCatalog, ItemCatalogProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemCatalog',
  component: ItemCatalog
}

export const Component = (args: ItemCatalogProps) => (
  <StorybookPage>
    <ItemCatalog {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        // @ts-expect-error
        <ItemCatalog key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
