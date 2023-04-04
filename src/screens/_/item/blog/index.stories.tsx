/*
 * @Author: czy0729
 * @Date: 2023-04-05 04:19:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:21:00
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemBlog, ItemBlogProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemBlog',
  component: ItemBlog
}

export const Component = (args: ItemBlogProps) => (
  <StorybookPage>
    <ItemBlog {...args} />
  </StorybookPage>
)

Component.args = list[0] as ItemBlogProps

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <ItemBlog key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
