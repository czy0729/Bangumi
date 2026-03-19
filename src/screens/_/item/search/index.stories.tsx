/*
 * @Author: czy0729
 * @Date: 2023-04-04 20:24:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:47:29
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemSearch as Component } from './index'
import { list } from './index.mock'

import type { ItemSearchProps as Props } from './index'

export default {
  title: 'item/ItemSearch',
  component: Component
}

export const Item = (args: Props) => (
  <StorybookPage>
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
