/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-27 05:38:21
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import ToolBar from '../tool-bar'
import { Ctx } from '../types'
import ListLayout from './list'
import Grid from './grid'

function List(props, { $ }: Ctx) {
  const { show, layout, fixed } = $.state
  const { _loaded } = $.browser
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
      renderItem={({ item, index }) => {
        if ($.isList) return <ListLayout item={item} />
        return <Grid item={item} index={index} />
      }}
      scrollToTop
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchBrowser}
    />
  )
}

export default obc(List)
