/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 10:48:42
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

function List({ item }, { $, navigation }: Ctx) {
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collectionStatus(id)
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      event={EVENT_LIST}
      collection={collection}
      {...item}
      onManagePress={$.onShowManageModal}
    />
  )
}

export default obc(List)
