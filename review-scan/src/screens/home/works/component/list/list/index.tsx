/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:43:35
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'

const EVENT = {
  id: '作品.跳转',
  data: {
    type: 'list'
  }
} as const

function List({ item, index }) {
  const navigation = useNavigation()
  const id = String(item.id).replace('/subject/', '')
  return (
    <ItemSearch
      navigation={navigation}
      style={_.container.item}
      event={EVENT}
      index={index}
      {...item}
      tip={HTMLDecode(item.tip)}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      collection={collectionStore.collect(id)}
    />
  )
}

export default ob(List)
