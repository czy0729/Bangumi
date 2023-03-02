/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 14:19:43
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Item from '../item'

function List(props, { $ }: Ctx) {
  const { _loaded } = $.monoVoices
  if (!_loaded) return <Loading />

  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.monoVoices.list}
      limit={5}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
