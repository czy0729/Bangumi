/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:21:58
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  if (!$.list._loaded || !$.state.show) {
    return (
      <>
        {!$.state.fixed && <ToolBar />}
        <Loading />
      </>
    )
  }

  const numColumns = $.isList ? undefined : _.portrait(3, 5)
  return (
    <ListView
      key={`${$.state.layout}${numColumns}`}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      data={$.list}
      lazy={9}
      ListHeaderComponent={!$.state.fixed && <ToolBar />}
      renderItem={renderItem}
      scrollToTop
      scrollEventThrottle={4}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchBrowser}
    />
  )
}

export default obc(List, COMPONENT)
