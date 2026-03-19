/*
 * @Author: czy0729
 * @Date: 2023-04-05 02:25:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:42:58
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemPost as Component } from './index'
import { list } from './index.mock'

import type { ItemPostProps as Props } from './index'

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
