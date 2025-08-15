/*
 * @Author: czy0729
 * @Date: 2023-04-05 05:50:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:51:19
 */
import React from 'react'
import { StorybookPage, StorybookList, Flex } from '@components'
import { ItemVoice as Component, ItemVoiceProps as Props } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemVoice',
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
        // @ts-expect-error
        <Component key={item.name} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
