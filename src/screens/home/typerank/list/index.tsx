/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 18:43:07
 */
import React from 'react'
import { Empty, Loading, ScrollView } from '@components'
import { PaginationList2, ItemSubject } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../types'

const EVENT = {
  id: '分类排行.跳转'
} as const

function List(props, { $, navigation }: Ctx) {
  if (!$.ids.length) return <Empty text='此标签没有足够的列表数据' />

  const { searching } = $.state
  if (searching) return <Loading style={_.container.flex} />

  return (
    <ScrollView
      contentContainerStyle={_.container.bottom}
      keyboardDismissMode='on-drag'
      onScroll={$.onScroll}
    >
      <PaginationList2
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.ids}
        limit={12}
        renderItem={({ item, index }) => (
          <ItemSubject
            navigation={navigation}
            event={EVENT}
            index={index}
            subjectId={item}
            type={$.type}
            subject={$.subject(item)}
            oss={$.subjectOSS(item)}
            active={$.subjectId == item}
          />
        )}
        onPage={$.fetchSubjectsFromOSS}
        onNextPage={$.fetchSubjectsFromOSS}
      />
    </ScrollView>
  )
}

export default obc(List)

function keyExtractor(item: SubjectId) {
  return String(item)
}
