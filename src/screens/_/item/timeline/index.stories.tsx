/*
 * @Author: czy0729
 * @Date: 2023-04-05 05:40:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-05 05:40:55
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { _ } from '@stores'
import { ItemTimeline, ItemTimelineProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemTimeline',
  component: ItemTimeline
}

export const Component = (args: ItemTimelineProps) => (
  <StorybookPage>
    <ItemTimeline {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList style={_.container.wind}>
      {list.map((item, index) => (
        // @ts-expect-error
        <ItemTimeline key={index} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
