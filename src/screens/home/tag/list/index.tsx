/*
 * @Author: czy0729
 * @Date: 2022-07-30 04:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 12:26:55
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { _ } from '@stores'
import { keyExtractor, x18s } from '@utils'
import { obc } from '@utils/decorators'
import { TEXT_18X } from '@constants'
import ToolBar from '../tool-bar'
import { Ctx } from '../types'
import ListLayout from './list'
import Grid from './grid'

function List(props, { $ }: Ctx) {
  const { hide, fixed } = $.state
  const { _loaded } = $.tag
  if (!_loaded || hide) {
    return (
      <>
        {!fixed && <ToolBar />}
        <Loading />
      </>
    )
  }

  const { list } = $.state
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
      ListHeaderComponent={!fixed && <ToolBar />}
      renderItem={({ item, index }) => {
        if (list)
          return (
            <>
              <ListLayout item={item} />
              {!index && <Heatmap id='用户标签.跳转' />}
            </>
          )
        return <Grid item={item} index={index} numColumns={numColumns} />
      }}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.onFooterRefresh}
    />
  )
}

export default obc(List)
