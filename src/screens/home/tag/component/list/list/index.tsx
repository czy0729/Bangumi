/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:15:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSearch } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { EVENT } from './ds'

import type { Ctx } from '../../../types'

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

export default observer(List)
