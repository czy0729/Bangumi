/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 12:10:50
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import Item from '@tinygrail/_/item'
import { refreshControlProps } from '@tinygrail/styles'
import { TABS } from '../ds'
import { Ctx } from '../types'

const EVENT = {
  id: '新番榜单.跳转'
} as const

function List({ id }) {
  const { $ } = useStore<Ctx>()
  const list = $.computedList(id)
  if (!list._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const { page } = $.state
  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={list}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop={TABS[page].key === id}
      renderItem={renderItem}
      onHeaderRefresh={() => $.fetchList(id)}
    />
  )
}

export default ob(List)

function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
