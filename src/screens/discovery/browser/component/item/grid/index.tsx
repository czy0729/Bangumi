/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:02:22
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT, EVENT } from './ds'

function Grid({ item, index, id, typeCn }) {
  const numColumns = _.portrait(3, 5)
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left}
      num={numColumns}
      collection={collectionStore.collect(id)}
      event={EVENT}
      {...item}
      isCollect={item.collected}
      isRectangle={typeCn === '音乐'}
    />
  )
}

export default ob(Grid, COMPONENT)
