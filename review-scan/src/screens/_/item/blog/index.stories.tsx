/*
 * @Author: czy0729
 * @Date: 2023-04-05 04:19:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:21:00
 */
import React from 'react'
import { StorybookPage, StorybookList, Flex } from '@components'
import { ItemBlog as Component, ItemBlogProps as Props } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemBlog',
  component: Component
}

export const Item = (args: Props) => (
  <StorybookPage radius>
    <Flex.Item>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

Item.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <Component key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
