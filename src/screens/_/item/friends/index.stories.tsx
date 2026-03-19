/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:26:35
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemFriends as Component } from './index'
import { list } from './index.mock'

import type { ItemFriendsProps as Props } from './index'

export default {
  title: 'item/ItemFriends',
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
        <Component key={item.userId} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
