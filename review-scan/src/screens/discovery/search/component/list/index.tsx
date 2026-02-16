/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:53:04
 */
import React from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
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
}

export default ob(List, COMPONENT)
