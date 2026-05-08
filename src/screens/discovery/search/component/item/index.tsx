/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 01:05:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSearch } from '@_'
import { collectionStore, useStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, EVENT } from './ds'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ index, ...item }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <ItemSearch
      navigation={navigation}
      {...item}
      index={index}
      event={EVENT}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      collection={collectionStore.collect(String(item.id).replace('/subject/', ''))}
      highlight={$.state.value}
    />
  )
}

export default observer(Item)
