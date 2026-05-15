/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 05:18:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT, EVENT } from './ds'

function Grid({ item, index, id, typeCn }) {
  r(COMPONENT)

  const numColumns = _.portrait(_.device(3, 4), 5)

  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left}
      index={index}
      num={numColumns}
      collection={collectionStore.collect(id)}
      event={EVENT}
      {...item}
      isCollect={item.collected}
      isRectangle={typeCn === '音乐'}
    />
  )
}

export default observer(Grid)
