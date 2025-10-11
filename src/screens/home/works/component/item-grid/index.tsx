/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:42:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:05:20
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { MonoWorksItem } from '@stores/subject/types'
import { matchYear, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { RenderItem, SubjectTypeCn } from '@types'
import { COMPONENT, EVENT } from './ds'

function ItemGrid({ item, index }: RenderItem<MonoWorksItem>) {
  r(COMPONENT)

  return useObserver(() => {
    const numColumns = _.portrait(3, 5)
    const id = String(item.id).replace('/subject/', '')
    return (
      <ItemCollectionsGrid
        style={stl(
          (_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left,
          index < numColumns && _.mt.sm
        )}
        num={numColumns}
        event={EVENT}
        {...item}
        airtime={matchYear(item.tip)}
        id={id}
        collection={collectionStore.collect(id)}
        typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      />
    )
  })
}

export default ItemGrid
