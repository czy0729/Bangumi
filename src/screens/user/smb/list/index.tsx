/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-30 20:48:19
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Top from '../top'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { uuid, sort, tags } = $.state
  return (
    <PaginationList
      key={`${uuid}|${sort}|${tags.join()}|${$.current?.smb?.loaded}`}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.filterList}
      ListHeaderComponent={<Top />}
      renderItem={renderItem}
      footerEmptyDataText={
        $.smbs.length
          ? '当前没有目录数据，请先扫描点右上方菜单扫描目录'
          : '当前没有服务器数据，请先点击右上方 + 添加'
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
