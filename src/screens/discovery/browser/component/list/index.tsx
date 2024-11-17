/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:58:02
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
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
      ref={$.forwardRef}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      numColumns={numColumns}
      data={$.list}
      ListHeaderComponent={!$.state.fixed && <ToolBar />}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchBrowser}
    />
  )
}

export default ob(List, COMPONENT)
