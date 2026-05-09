/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 22:23:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.monoVoices._loaded) return null

  return (
    <PaginationList2
      key={`${$.state.outerOrder}|${$.state.innerOrder}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.sortedMonoVoicesList}
      limit={6}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onPage={$.onPage}
    />
  )
}

export default observer(List)
