/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 02:54:22
 */
import React from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.search._loaded) return null

    return (
      <ListView
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        data={$.search}
        keyboardDismissMode='on-drag'
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.doSearch}
      />
    )
  })
}

export default List
