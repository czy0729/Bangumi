/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:53:24
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { EVENT } from './ds'

function Item({ item, index }) {
  const navigation = useNavigation()
  const id = String(item.id).replace('/subject/', '')
  const collection = collectionStore.collect(id)
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      index={index}
      event={EVENT}
      {...item}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      collection={collection}
    />
  )
}

export default ob(Item)
