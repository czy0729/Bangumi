/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-08 19:43:55
 */
import React, { useCallback } from 'react'
import { PaginationList2 } from '@_'
import { _, tinygrailStore, useStore } from '@stores'
import { queue } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/_/ds'
import { Ctx } from '../../types'
import Item from '../item'
import { keyExtractor } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function List({ id }: Props) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const dataSources = {
      merge: () => $.mergeList,
      chara: () => $.charaList,
      temple: () => $.temple,
      default: () => $.myCharaAssets.ico
    }

    const refreshHandlers = {
      merge: () =>
        queue([
          () => $.fetchTemple(),
          () => $.fetchMyCharaAssets(),
          () => tinygrailStore.fetchBid(),
          () => tinygrailStore.fetchAsks(),
          () => tinygrailStore.fetchAuction()
        ]),
      chara: () =>
        queue([
          () => $.fetchMyCharaAssets(),
          () => tinygrailStore.fetchBid(),
          () => tinygrailStore.fetchAsks(),
          () => tinygrailStore.fetchAuction()
        ]),
      temple: () => $.fetchTemple(),
      default: () => $.fetchMyCharaAssets()
    }

    const isTemple = id === 'temple'
    const numColumns = isTemple ? 3 : undefined
    const data = (dataSources[id] || dataSources.default)() // 惰性执行

    const handleHeaderRefresh = useCallback(
      () => (refreshHandlers[id] || refreshHandlers.default)(),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [$, id]
    )
    const handleRenderItem = useCallback(
      ({ item, index }) => <Item id={id} index={index} item={item} />,
      []
    )

    return (
      <PaginationList2
        {...TINYGRAIL_LIST_PROPS}
        key={`${_.orientation}${numColumns}`}
        keyExtractor={keyExtractor}
        style={_.container.flex}
        contentContainerStyle={isTemple ? styles.temple : styles.list}
        data={data.list}
        numColumns={numColumns}
        renderItem={handleRenderItem}
        onHeaderRefresh={handleHeaderRefresh}
      />
    )
  })
}

export default List
