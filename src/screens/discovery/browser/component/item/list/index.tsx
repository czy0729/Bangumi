/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:57:52
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT, EVENT } from './ds'

function List({ item, index }) {
  const { $, navigation } = useStore<Ctx>()
  const { type } = $.state
  const id = String(item.id).replace('/subject/', '')
  return (
    <ItemSearch
      style={_.container.item}
      navigation={navigation}
      event={EVENT}
      index={index}
      {...item}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)}
      collection={collectionStore.collect(id)}
    />
  )
}

export default ob(List, COMPONENT)
