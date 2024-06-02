/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 16:33:22
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  if (!$.monoVoices._loaded) return <Loading />

  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.monoVoices.list}
      limit={5}
      scrollToTop
      renderItem={renderItem}
      scrollEventThrottle={4}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List, COMPONENT)
