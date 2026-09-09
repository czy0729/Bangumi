/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:42:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:05:34
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useInsets } from '@utils/hooks'
import Info from '../info'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  const elInfo = useMemo(() => <Info />, [])

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      limit={16}
      scrollEventThrottle={16}
      ListHeaderComponent={elInfo}
      progressViewOffset={_.ios(statusBarHeight, headerHeight)}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default observer(List)
