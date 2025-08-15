/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:42:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:43:21
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { matchYear, stl } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'

const EVENT = {
  id: '作品.跳转',
  data: {
    type: 'grid'
  }
} as const

function Grid({ item, index, numColumns }) {
  const navigation = useNavigation()
  const id = String(item.id).replace('/subject/', '')
  return (
    <ItemCollectionsGrid
      navigation={navigation}
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
}

export default ob(Grid)
