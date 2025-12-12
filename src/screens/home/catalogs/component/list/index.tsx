/*
 * @Author: czy0729
 * @Date: 2022-09-01 09:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:17:41
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

  return useObserver(() => (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.page}
      data={$.list}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectCatalogs}
    />
  ))
}

export default List
