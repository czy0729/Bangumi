/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:49:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 12:27:07
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { matchYear } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

const EVENT_GRID = {
  id: '用户标签.跳转',
  data: {
    type: 'grid'
  }
}

function Grid({ item, index, numColumns }, { $, navigation }: Ctx) {
  const { airtime } = $.state
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collectionStatus(id)
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      style={(_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left}
      index={index}
      event={EVENT_GRID}
      collection={collection}
      num={numColumns}
      {...item}
      airtime={airtime === '' && matchYear(item.tip)}
      isCollect={item.collected}
    />
  )
}

export default obc(Grid)
