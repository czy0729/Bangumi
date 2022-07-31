/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 18:58:33
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils'
import ToolBar from '../tool-bar'
import { Ctx } from '../types'
import ListLayout from './list'
import Grid from './grid'

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
      numColumns={numColumns}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.list}
      scrollToTop
      ListHeaderComponent={!fixed && <ToolBar />}
      renderItem={({ item, index }) => {
        if (list) {
          return (
            <>
              <ListLayout item={item} />
              {!index && <Heatmap id='作品.跳转' />}
            </>
          )
        }
        return <Grid item={item} index={index} numColumns={numColumns} />
      }}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchMonoWorks}
    />
  )
}

export default obc(List)
