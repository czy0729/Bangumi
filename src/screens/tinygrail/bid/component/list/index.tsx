/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 16:34:16
 */
import React, { useCallback } from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from '@tinygrail/_/item'
import { refreshControlProps } from '@tinygrail/styles'
import { Ctx, TabsKeys } from '../../types'
import { keyExtractor } from './utils'
import { EVENT, GO } from './ds'

function List({ id }: { id: TabsKeys }) {
  const { $ } = useStore<Ctx>()
  const { sort } = $.state
  const handleRenderItem = useCallback(
    ({ item, index }: any) => {
      const isAuctioning = id === 'auction' && item.state === 0
      return (
        <Item
          index={index}
          type={id}
          event={EVENT}
          go={GO[id]}
          onAuctionCancel={$.doAuctionCancel}
          {...item}
          showMenu
          sort={sort}
          topWeekRank={isAuctioning ? $.topWeekRank(item.monoId) : ''}
        />
      )
    },
    [$, id, sort]
  )
  const handleHeaderRefresh = useCallback(() => $.fetchList(id), [$, id])

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
        renderItem={handleRenderItem}
        onHeaderRefresh={handleHeaderRefresh}
      />
    )
  })
}

export default List
