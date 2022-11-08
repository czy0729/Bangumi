/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 17:48:10
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import Item from '@tinygrail/_/item'
import { Ctx } from '../types'

const EVENT = {
  id: 'ICO.跳转'
} as const

function List({ id }, { $ }: Ctx) {
  const list = $.list(id)
  if (!list._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

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
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={() => $.fetchList(id)}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
