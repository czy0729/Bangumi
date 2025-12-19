/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:01:01
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      limit={16}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  ))
}

export default List
