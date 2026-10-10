/*
 * @Author: czy0729
 * @Date: 2023-03-28 13:26:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 索引条目, 列表布局渲染 ItemSearch, 网格布局渲染 ItemCollectionsGrid
 */
import { observer } from 'mobx-react'
import { ItemCollectionsGrid, ItemSearch } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, EVENT_GRID, EVENT_LIST } from './ds'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const id = String(item.id).replace('/subject/', '')
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)
  const collection = collectionStore.collect(id, typeCn)

  if ($.isList) {
    return (
      <ItemSearch
        navigation={navigation}
        index={index}
        typeCn={typeCn}
        collection={collection}
        {...item}
        event={EVENT_LIST}
      />
    )
  }

  const numColumns = $.numColumns

  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left}
      index={index}
      num={numColumns}
      typeCn={typeCn}
      collection={collection}
      {...item}
      isRectangle={typeCn === '音乐'}
      event={EVENT_GRID}
    />
  )
}

export default observer(Item)
