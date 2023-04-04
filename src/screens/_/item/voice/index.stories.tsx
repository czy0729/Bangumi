/*
 * @Author: czy0729
 * @Date: 2023-04-05 05:50:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:51:19
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { _ } from '@stores'
import { ItemVoice, ItemVoiceProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemVoice',
  component: ItemVoice
}

export const Component = (args: ItemVoiceProps) => (
  <StorybookPage>
    <ItemVoice {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList style={_.container.wind}>
      {list.map(item => (
        // @ts-expect-error
        <ItemVoice key={item.name} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
