/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 15:32:11
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch } from '@_'
import { collectionStore, _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'

const EVENT = {
  id: '搜索.跳转'
} as const

function List(props, { $, navigation }) {
  const { searching } = $.state
  if (searching) return <Loading style={_.container.flex} />

  const search = $.search()
  if (!search._loaded) return null

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={search}
      scrollToTop
      renderItem={({ item, index }) => {
        const id = String(item.id).replace('/subject/', '')
        const collection = collectionStore.collectionStatus(id)
        return (
          <>
            <ItemSearch
              style={_.container.item}
              navigation={navigation}
              event={EVENT}
              collection={collection}
              typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
              {...item}
            />
            {!index && <Heatmap id='搜索.跳转' />}
          </>
        )
      }}
      onFooterRefresh={$.doSearch}
    />
  )
}

export default obc(List)
