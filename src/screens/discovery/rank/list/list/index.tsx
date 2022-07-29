/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-27 05:19:12
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
          const collection = collectionStore.collectionStatus(id)
          return (
            <>
              <ItemSearch
                key={item.id}
                style={_.container.item}
                navigation={navigation}
                collection={collection}
                event={EVENT_LIST}
                typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)}
                {...item}
                onManagePress={$.onShowManageModal}
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
