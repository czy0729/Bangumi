/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:19:45
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemNotify, ItemNotifyProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemNotify',
  component: ItemNotify
}

export const Component = (args: ItemNotifyProps) => (
  <StorybookPage>
    <ItemNotify {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <ItemNotify key={item.userId} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
