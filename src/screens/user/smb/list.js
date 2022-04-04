/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-05 05:57:59
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Top from './top'
import Item from './item'

function List(props, { $ }) {
  const { uuid, sort, tags } = $.state
  return (
    <PaginationList
      key={`${uuid}|${sort}|${tags.join()}|${$.current?.smb?.loaded}`}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.filterList}
      ListHeaderComponent={<Top />}
      renderItem={renderItem}
      showFooter={!$.list.length}
      footerEmptyDataText='当前没有数据，请先扫描目录'
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List)

function keyExtractor(item, index) {
  return String(item?.subjectId || index)
}

function renderItem({ item }) {
  return <Item {...item} />
}
