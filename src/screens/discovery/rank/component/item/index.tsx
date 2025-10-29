/*
 * @Author: czy0729
 * @Date: 2025-10-29 23:02:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:19:39
 */
import React from 'react'
import { ItemCollectionsGrid, ItemSearch } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { matchYear } from '@utils'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, EVENT_GRID, EVENT_LIST } from './ds'
import { styles } from './styles'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const id = String(item.id).replace('/subject/', '')
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)
    const collection = collectionStore.collect(id, typeCn)

    if ($.isList) {
      return (
        <ItemSearch
          key={item.id}
          style={_.container.item}
          navigation={navigation}
          index={index}
          collection={collection}
          typeCn={typeCn}
          {...item}
          cover={item.cover || $.cover(item.id)}
          screen='排行榜'
          event={EVENT_LIST}
        />
      )
    }

    const num = _.portrait(3, 5)

    return (
      <ItemCollectionsGrid
        key={item.id}
        style={!(index % num) && styles.left}
        num={num}
        airtime={$.airtime === '' && matchYear(item.tip)}
        {...item}
        id={id}
        cover={item.cover || $.cover(item.id)}
        typeCn={typeCn}
        collection={collection}
        isRectangle={typeCn === '音乐'}
        event={EVENT_GRID}
      />
    )
  })
}

export default Item
