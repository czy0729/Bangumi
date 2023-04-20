/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 11:50:18
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

const EVENT_LIST = {
  id: '用户标签.跳转',
  data: {
    type: 'list'
  }
}

function List({ item, index }, { navigation }: Ctx) {
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collect(id)
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      index={index}
      event={EVENT_LIST}
      collection={collection}
      {...item}
    />
  )
}

export default obc(List)
