/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-25 21:22:43
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT, EVENT } from './ds'

function List({ item, index, id, typeCn }) {
  const { navigation } = useStore<Ctx>()
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      event={EVENT}
      index={index}
      {...item}
      typeCn={typeCn}
      collection={collectionStore.collect(id)}
    />
  )
}

export default ob(List, COMPONENT)
