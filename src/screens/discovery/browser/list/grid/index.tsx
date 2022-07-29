/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-27 05:28:32
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { obc } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'

const EVENT = {
  id: '索引.跳转',
  data: {
    type: 'grid'
  }
}

function Grid({ item, index }, { $, navigation }: Ctx) {
  const { type } = $.state
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collectionStatus(id)
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % this.num) && _.container.left}
      navigation={navigation}
      num={_.portrait(3, 5)}
      collection={collection}
      event={EVENT}
      {...item}
      isCollect={item.collected}
      isRectangle={typeCn === '音乐'}
    />
  )
}

export default obc(Grid)
