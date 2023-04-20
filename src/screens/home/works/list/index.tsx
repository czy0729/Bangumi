/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 11:54:26
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils'
import ToolBar from '../tool-bar'
import { Ctx } from '../types'
import ListItem from './list'
import GridItem from './grid'

function List(props, { $ }: Ctx) {
  const { fixed, list } = $.state
  const { _loaded } = $.list
  if (!_loaded) {
    return (
      <>
        {!fixed && <ToolBar />}
        <Loading />
      </>
    )
  }

  const numColumns = list ? undefined : _.portrait(3, 5)
  return (
    <ListView
      key={`${_.orientation}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      numColumns={numColumns}
      scrollToTop
      ListHeaderComponent={!fixed && <ToolBar />}
      renderItem={list ? renderListItem : renderGridItem}
      scrollEventThrottle={32}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchMonoWorks}
    />
  )
}

export default obc(List)

function renderListItem({ item, index }) {
  return (
    <>
      <ListItem item={item} index={index} />
      {!index && <Heatmap id='作品.跳转' />}
    </>
  )
}

function renderGridItem({ item, index }) {
  return <GridItem item={item} index={index} numColumns={_.portrait(3, 5)} />
}
