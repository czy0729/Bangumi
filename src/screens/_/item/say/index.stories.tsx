/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:24:30
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { _ } from '@stores'
import { ItemSay, ItemSayProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemSay',
  component: ItemSay
}

export const Component = (args: ItemSayProps) => (
  <StorybookPage>
    <ItemSay {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList style={_.container.wind}>
      {list.map(item => (
        <ItemSay key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
