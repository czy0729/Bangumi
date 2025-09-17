/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-17 18:37:54
 */
import React from 'react'
import { ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { MonoWorksItem } from '@stores/subject/types'
import { HTMLDecode } from '@utils'
import { useNavigation, useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { RenderItem, SubjectTypeCn } from '@types'
import { COMPONENT, EVENT } from './ds'

function Item({ item, index }: RenderItem<MonoWorksItem>) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
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
  })
}

export default Item
