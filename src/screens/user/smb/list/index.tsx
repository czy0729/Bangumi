/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 06:04:43
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Top from '../top'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { uuid, listComponentKey } = $.state
  return (
    <PaginationList
      key={`${uuid}|${listComponentKey}`}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.memoList}
      ListHeaderComponent={<Top />}
      renderItem={renderItem}
      footerEmptyDataText={
        $.smbs.length
          ? `当前没有目录数据\n请先点击右上方菜单扫描目录`
          : `当前没有服务器数据\n请先点击右上方菜单新增服务`
      }
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List)

function keyExtractor(item: { subjectId: any }, index: number) {
  return String(item?.subjectId || index)
}

function renderItem({ item }) {
  return <Item {...item} />
}
