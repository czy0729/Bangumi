/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:25:48
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { EVENT } from './ds'

function List({ item, index }) {
  const { $, navigation } = useStore<Ctx>()
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

export default ob(List)
