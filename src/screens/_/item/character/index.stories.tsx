/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:03:51
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemCharacter, ItemCharacterProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemCharacter',
  component: ItemCharacter
}

export const Component = (args: ItemCharacterProps) => (
  <StorybookPage>
    <ItemCharacter {...args} />
  </StorybookPage>
)

Component.args = list[3]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        // @ts-expect-error
        <ItemCharacter key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
