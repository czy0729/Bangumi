/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:49:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:25:34
 */
import React from 'react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { matchYear } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { EVENT } from './ds'

function Grid({ item, index, numColumns }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      style={(_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left}
      index={index}
      event={EVENT}
      num={numColumns}
      {...item}
      typeCn={$.typeCn}
      collection={collectionStore.collect(String(item.id).replace('/subject/', ''))}
      airtime={$.state.airtime === '' && matchYear(item.tip)}
      isCollect={item.collected}
    />
  )
}

export default ob(Grid)
