/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 21:18:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSearch } from '@_'
import { collectionStore } from '@stores'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'

function List({ item, index, id, typeCn }) {
  const navigation = useNavigation(COMPONENT)

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
