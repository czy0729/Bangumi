/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 19:52:25
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import Item from '@tinygrail/_/item'
import { Ctx } from '../types'

const EVENT = {
  id: '英灵殿.跳转'
} as const

function List(props, { $ }: Ctx) {
  const { _loaded } = $.computedList
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={$.computedList}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={$.fetchValhallList}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return <Item index={index} type='valhall' event={EVENT} {...item} />
}
