/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 00:06:37
 */
import React, { useCallback } from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { Ctx, TabsKey } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List({ id }: { id: TabsKey }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const list = $.list(id)
    const handleHeaderRefresh = useCallback(() => $.fetchList(id), [])
    if (!list._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

    return (
      <PaginationList2
        {...TINYGRAIL_LIST_PROPS}
        data={list.list}
        limit={24}
        renderItem={renderItem}
        onHeaderRefresh={handleHeaderRefresh}
      />
    )
  })
}

export default List
