/*
 * @Author: czy0729
 * @Date: 2023-04-05 02:25:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 02:42:15
 */
import React from 'react'
import { StorybookPage, StorybookList, Flex } from '@components'
import { ItemPost as Component, ItemPostProps as Props } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemPost',
  component: Component
}

export const Item = (args: Props) => (
  <StorybookPage radius>
    <Flex.Item>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

Item.args = list[7]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <Component key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
