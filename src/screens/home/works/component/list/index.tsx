/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 15:52:38
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderGridItem, renderListItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  if (!$.list._loaded) {
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
      data={$.list}
      numColumns={numColumns}
      scrollToTop
      ListHeaderComponent={!$.state.fixed && <ToolBar />}
      renderItem={$.state.list ? renderListItem : renderGridItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchMonoWorks}
    />
  )
}

export default obc(List, COMPONENT)
