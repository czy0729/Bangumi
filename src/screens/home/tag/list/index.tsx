/*
 * @Author: czy0729
 * @Date: 2022-07-30 04:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 13:30:44
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { Notice } from '@_'
import { _ } from '@stores'
import { keyExtractor, x18s } from '@utils'
import { obc } from '@utils/decorators'
import { TEXT_18X } from '@constants'
import ToolBar from '../tool-bar'
import { Ctx } from '../types'
import ListItem from './list'
import GridItem from './grid'

function List(props, { $ }: Ctx) {
  const { hide, fixed } = $.state
  const { _loaded } = $.list
  if (!_loaded || hide) {
    return (
      <>
        {!fixed && <ToolBar />}
        <Loading />
      </>
    )
  }

  const { order, list } = $.state
  const numColumns = list ? undefined : _.portrait(3, 5)
  return (
    <ListView
      key={`${_.orientation}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      numColumns={numColumns}
      data={$.list}
      scrollToTop
      footerEmptyDataText={x18s($.params.tag) ? TEXT_18X : undefined}
      ListHeaderComponent={
        <>
          {!fixed && <ToolBar />}
          {order === 'rank' && (
            <Notice>
              因标签为用户自行添加，
              「按排名」排序在关联条目过多情况下可能毫无意义，推荐「按标注」排序。
            </Notice>
          )}
        </>
      }
      renderItem={({ item, index }) => {
        // {!index && <Heatmap id='用户标签.跳转' />}
        if (list) return <ListItem item={item} index={index} />
        return <GridItem item={item} index={index} numColumns={numColumns} />
      }}
      scrollEventThrottle={4}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.onFooterRefresh}
    />
  )
}

export default obc(List)
