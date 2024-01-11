/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:26:52
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT, EVENT } from './ds'

function Grid({ item, index }, { $, navigation }: Ctx) {
  const { type } = $.state
  const id = String(item.id).replace('/subject/', '')
  const numColumns = _.portrait(3, 5)
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left}
      navigation={navigation}
      num={numColumns}
      collection={collectionStore.collect(id)}
      event={EVENT}
      {...item}
      isCollect={item.collected}
      isRectangle={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type) === '音乐'}
    />
  )
}

export default obc(Grid, COMPONENT)
