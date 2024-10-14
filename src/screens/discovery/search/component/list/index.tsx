/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 13:26:39
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(_props, { $ }: Ctx) {
  if ($.state.searching) return <Loading style={_.container.flex} />

  if (!$.search._loaded) return null

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.search}
      keyboardDismissMode='on-drag'
      scrollToTop
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.doSearch}
    />
  )
}

export default obc(List, COMPONENT)
