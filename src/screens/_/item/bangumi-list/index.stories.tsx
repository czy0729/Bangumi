/*
 * @Author: czy0729
 * @Date: 2023-04-05 04:12:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:41:08
 */
import React from 'react'
import { StorybookGrid, StorybookPage } from '@components'
import { ItemBangumiList as Component } from './index'
import { list } from './index.mock'

import type { ItemBangumiListProps as Props } from './index'

export default {
  title: 'item/ItemBangumiList',
  component: Component
}

export const Item = (args: Props) => <Component {...args} />

Item.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookGrid space>
      {list.map(item => (
        <Component key={item.subjectId} {...item} />
      ))}
    </StorybookGrid>
  </StorybookPage>
)
