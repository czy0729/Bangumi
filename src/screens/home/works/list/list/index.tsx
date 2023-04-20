/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 11:55:21
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { obc } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { HTMLDecode } from '@utils'

const EVENT = {
  id: '作品.跳转',
  data: {
    type: 'list'
  }
} as const

function List({ item, index }, { navigation }: Ctx) {
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collect(id)
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      event={EVENT}
      index={index}
      {...item}
      tip={HTMLDecode(item.tip)}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      collection={collection}
    />
  )
}

export default obc(List)
