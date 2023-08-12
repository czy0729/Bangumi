/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:46:43
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import ToolBar from '../tool-bar'
import { Ctx } from '../types'
import Item from './item'

function List(props, { $ }: Ctx) {
  const { show, layout, fixed } = $.state
  const { _loaded } = $.list
  if (!_loaded || !show) {
    return (
      <>
        {!fixed && <ToolBar />}
        <Loading />
      </>
    )
  }

  const numColumns = $.isList ? undefined : _.portrait(3, 5)
  return (
    <ListView
      key={`${layout}${numColumns}`}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      data={$.list}
      lazy={9}
      ListHeaderComponent={!fixed && <ToolBar />}
      renderItem={renderItem}
      scrollToTop
      scrollEventThrottle={4}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchBrowser}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
