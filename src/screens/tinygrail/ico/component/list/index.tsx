/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:30:07
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx, TabsKey } from '../../types'

function List({ id }: { id: TabsKey }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const list = $.list(id)
  const handleHeaderRefresh = useCallback(() => $.fetchList(id), [$, id])
  if (!list._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

  return (
    <PaginationList
      {...TINYGRAIL_LIST_PROPS}
      data={list.list}
      limit={24}
      renderItem={renderItem}
      onHeaderRefresh={handleHeaderRefresh}
    />
  )
}

export default observer(List)
