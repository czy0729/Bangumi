/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-10 18:27:53
 */
import React, { useCallback } from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Item from '@tinygrail/_/item'
import ItemRefine from '@tinygrail/_/item-refine'
import { refreshControlProps } from '@tinygrail/styles'
import { Ctx, TabsKey } from '../../types'
import { COMPONENT, EVENT } from './ds'

function List({ id }: { id: TabsKey }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const { sort } = $.state
  const renderItem = useCallback(
    ({ item, index }) => {
      const Component = id === 'refine/temple' ? ItemRefine : Item
      return <Component index={index} event={EVENT} {...item} sort={sort} />
    },
    [id, sort]
  )

  return useObserver(() => {
    const list = $.computedList(id)
    if (!list._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        style={_.container.flex}
        contentContainerStyle={_.container.bottom}
        refreshControlProps={refreshControlProps}
        footerTextType='tinygrailText'
        data={list.list}
        limit={25}
        renderItem={renderItem}
        onHeaderRefresh={$.fetchList}
      />
    )
  })
}

export default List
