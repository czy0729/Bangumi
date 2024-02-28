/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 04:34:30
 */
import React from 'react'
import { Empty, Heatmap } from '@components'
import { FilterText, ItemSearch } from '@_'
import { _, collectionStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT, EVENT_LIST } from './ds'

function List(props, { $, navigation }: Ctx) {
  const { list } = $.list
  const { _filter } = $.rank
  return (
    <>
      {list.length ? (
        list.map((item, index) => {
          const id = String(item.id).replace('/subject/', '')
          const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)
          const collection = collectionStore.collect(id, typeCn)
          return (
            <ItemSearch
              key={item.id}
              style={_.container.item}
              navigation={navigation}
              index={index}
              collection={collection}
              typeCn={typeCn}
              event={EVENT_LIST}
              {...item}
              cover={item.cover || $.cover(item.id)}
            />
          )
        })
      ) : (
        <Empty />
      )}
      {!!_filter && <FilterText value={_filter} />}
      <Heatmap id='排行榜.跳转' />
    </>
  )
}

export default obc(List, COMPONENT)
