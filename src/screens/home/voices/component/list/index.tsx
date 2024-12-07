/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:35
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  if (!$.monoVoices._loaded) return null

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.monoVoices.list}
      limit={5}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default ob(List, COMPONENT)
