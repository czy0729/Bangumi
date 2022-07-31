/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:42:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 18:52:21
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { obc } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { matchYear } from '@utils'

const EVENT = {
  id: '作品.跳转',
  data: {
    type: 'grid'
  }
} as const

function Grid({ item, index }, { navigation }: Ctx) {
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collectionStatus(id)
  const numColumns = _.portrait(3, 5)
  return (
    <ItemCollectionsGrid
      style={[
        (_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left,
        index < numColumns && _.mt.sm
      ]}
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
