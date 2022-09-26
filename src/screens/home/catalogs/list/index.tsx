/*
 * @Author: czy0729
 * @Date: 2022-09-01 09:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 20:55:53
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.list}
      lazy={4}
      renderItem={renderItem}
      scrollToTop
      onHeaderRefresh={() => $.fetchSubjectCatalogs(true)}
      onFooterRefresh={$.fetchSubjectCatalogs}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
