/*
 * @Author: czy0729
 * @Date: 2023-04-04 20:24:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 23:59:20
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemSearch, ItemSearchProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemSearch',
  component: ItemSearch
}

export const Component = (args: ItemSearchProps) => (
  <StorybookPage>
    <ItemSearch {...args} />
  </StorybookPage>
)

Component.args = list[0] as ItemSearchProps

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <ItemSearch key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
