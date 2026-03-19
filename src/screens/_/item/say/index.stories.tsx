/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:44:04
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { _ } from '@stores'
import { ItemSay as Component } from './index'
import { list } from './index.mock'

import type { ItemSayProps as Props } from './index'

export default {
  title: 'item/ItemSay',
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
    <StorybookList style={_.container.wind}>
      {list.map(item => (
        <Component key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
