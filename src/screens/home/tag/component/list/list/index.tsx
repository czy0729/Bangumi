/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 01:08:18
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSearch } from '@_'
import { collectionStore, useStore } from '@stores'
import { EVENT } from './ds'

import type { Ctx } from '../../../types'

function List({ item, index }) {
  const { $, navigation } = useStore<Ctx>()

  return (
    <ItemSearch
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
