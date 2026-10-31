/*
 * @Author: czy0729
 * @Date: 2022-12-08 11:03:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 条目容器: 注入 store 数据与样式
 */
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ItemEntry({ item }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      item={item}
      upload={$.upload(item.subject?.id)}
      onBottom={$.onBottom}
      onSubmit={$.onSubmit}
    />
  )
}

export default observer(ItemEntry)
