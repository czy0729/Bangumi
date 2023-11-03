/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 05:33:01
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Item from './item'

function List(props, { $ }: Ctx) {
  const { searching } = $.state
  if (searching) return <Loading style={_.container.flex} />

  const search = $.search()
  if (!search._loaded) return null

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={search}
      keyboardDismissMode='on-drag'
      scrollToTop
      renderItem={renderItem}
      scrollEventThrottle={4}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.doSearch}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return (
    <>
      <Item item={item} index={index} />
      {!index && <Heatmap id='搜索.跳转' />}
    </>
  )
}
