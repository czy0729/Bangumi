/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 05:49:22
 */
import React from 'react'
import { Empty, Heatmap } from '@components'
import { ItemSearch, FilterText } from '@_'
import { _, collectionStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { obc } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { EVENT_LIST } from './ds'

function List(props, { $, navigation }: Ctx) {
  const { type } = $.state
  const { list } = $.list
  const { _filter } = $.rank
  return (
    <>
      {list.length ? (
        list.map((item, index) => {
          const id = String(item.id).replace('/subject/', '')
          const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
          const collection = collectionStore.collect(id, typeCn)
          return (
            <>
              <ItemSearch
                key={item.id}
                style={_.container.item}
                navigation={navigation}
                collection={collection}
                typeCn={typeCn}
                event={EVENT_LIST}
                {...item}
              />
              {index === 1 && <Heatmap id='排行榜.跳转' />}
            </>
          )
        })
      ) : (
        <Empty />
      )}
      {!!_filter && <FilterText value={_filter} />}
    </>
  )
}

export default obc(List)
