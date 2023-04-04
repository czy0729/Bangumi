/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:16:23
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemFriends, ItemFriendsProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemFriends',
  component: ItemFriends
}

export const Component = (args: ItemFriendsProps) => (
  <StorybookPage>
    <ItemFriends {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <ItemFriends key={item.userId} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
