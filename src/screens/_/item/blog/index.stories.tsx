/*
 * @Author: czy0729
 * @Date: 2023-04-05 04:19:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:42:13
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemBlog as Component } from './index'
import { list } from './index.mock'

import type { ItemBlogProps as Props } from './index'

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
      {list.map((item, index) => (
        <Component key={item.id} index={index} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
