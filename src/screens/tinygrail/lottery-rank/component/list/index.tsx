/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:16:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:37:03
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <PaginationList
      key={$.state.sort}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.computedList}
      renderItem={renderItem}
      onHeaderRefresh={$.refresh}
    />
  )
}

export default observer(List)
