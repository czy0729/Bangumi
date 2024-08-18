/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 08:00:04
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { EVENT } from './ds'

function List({ item, index }, { $, navigation }: Ctx) {
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      index={index}
      event={EVENT}
      {...item}
      collection={collectionStore.collect(String(item.id).replace('/subject/', ''))}
      typeCn={$.typeCn}
    />
  )
}

export default obc(List)
