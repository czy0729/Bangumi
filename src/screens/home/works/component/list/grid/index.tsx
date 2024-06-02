/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:42:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:56:37
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { matchYear, stl } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'

const EVENT = {
  id: '作品.跳转',
  data: {
    type: 'grid'
  }
} as const

function Grid({ item, index, numColumns }, { navigation }: Ctx) {
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collect(id)
  return (
    <ItemCollectionsGrid
      style={stl(
        (_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left,
        index < numColumns && _.mt.sm
      )}
      navigation={navigation}
      num={numColumns}
      event={EVENT}
      {...item}
      airtime={matchYear(item.tip)}
      id={id}
      collection={collection}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
    />
  )
}

export default obc(Grid)
