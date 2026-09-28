/*
 * @Author: czy0729
 * @Date: 2023-04-05 00:01:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 02:51:40
 */
import { StorybookGrid, StorybookPage } from '@components'
import { ItemCollectionsGrid as Component } from './index'
import { list } from './index.mock'

import type { ItemCollectionsGridProps as Props } from './index'

export default {
  title: 'item/ItemCollectionsGrid',
  component: Component
}

export const Item = (args: Props) => <Component {...args} />

Item.args = list[2]

export const List = () => (
  <StorybookPage>
    <StorybookGrid space>
      {list.map((item, index) => (
        <Component key={item.id} index={index} {...item} />
      ))}
    </StorybookGrid>
  </StorybookPage>
)
