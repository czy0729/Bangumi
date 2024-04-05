/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 13:15:32
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  if (!$.catalogs._loaded) return <Loading style={_.container.plain} />

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.catalogs}
      lazy={6}
      scrollToTop
      renderItem={renderItem}
      scrollEventThrottle={4}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchCatalogs}
    />
  )
}

export default obc(List, COMPONENT)
