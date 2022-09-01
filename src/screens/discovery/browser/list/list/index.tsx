/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:56:48
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { obc } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'

const EVENT = {
  id: '索引.跳转',
  data: {
    type: 'list'
  }
} as const

function List({ item }, { $, navigation }: Ctx) {
  const { type } = $.state
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collectionStatus(id)
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      event={EVENT}
      {...item}
      typeCn={typeCn}
      collection={collection}
      onManagePress={$.onShowManageModal}
    />
  )
}

export default obc(List)
