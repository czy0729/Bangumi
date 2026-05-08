/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 01:07:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSearch } from '@_'
import { collectionStore, useStore } from '@stores'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../../types'

function List({ item, index, id, typeCn }) {
  const { navigation } = useStore<Ctx>(COMPONENT)

  return (
    <ItemSearch
      navigation={navigation}
      event={EVENT}
      index={index}
      {...item}
      typeCn={typeCn}
      collection={collectionStore.collect(id)}
    />
  )
}

export default observer(List)
