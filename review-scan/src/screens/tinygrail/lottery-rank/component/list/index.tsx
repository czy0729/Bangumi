/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:16:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-18 00:22:58
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <PaginationList2
      key={$.state.sort}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.computedList}
      renderItem={renderItem}
      onHeaderRefresh={$.refresh}
    />
  ))
}

export default List
