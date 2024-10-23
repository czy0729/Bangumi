/*
 * @Author: czy0729
 * @Date: 2022-07-30 04:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-20 10:40:20
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { Notice } from '@_'
import { _ } from '@stores'
import { keyExtractor, x18s } from '@utils'
import { obc } from '@utils/decorators'
import { TEXT_18X } from '@constants'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import GridItem from './grid'
import ListItem from './list'
import { COMPONENT } from './ds'

function List(_props, { $ }: Ctx) {
  if (!$.list._loaded || $.state.hide) {
    return (
      <>
        {!$.state.fixed && <ToolBar />}
        <Loading />
      </>
    )
  }

  const numColumns = $.state.list ? undefined : _.portrait(3, 5)
  return (
    <ListView
      key={`${_.orientation}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      numColumns={numColumns}
      data={$.list}
      footerEmptyDataText={x18s($.params.tag) ? TEXT_18X : undefined}
      ListHeaderComponent={
        <>
          {!$.state.fixed && <ToolBar />}
          {$.state.order === 'rank' && !$.state.meta && (
            <Notice>
              因标签为用户自行添加，
              「按排名」排序在关联条目过多情况下可能毫无意义，推荐「按收藏」排序。
            </Notice>
          )}
        </>
      }
      renderItem={({ item, index }) => {
        if ($.state.list) return <ListItem item={item} index={index} />

        return <GridItem item={item} index={index} numColumns={numColumns} />
      }}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.onFooterRefresh}
    />
  )
}

export default obc(List, COMPONENT)
