/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 *
 * 小组列表: 我的 / 全部
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Empty } from '@components'
import { PaginationList } from '@_'
import { rakuenStore, useStore } from '@stores'
import { getJSON } from '@assets/json'
import Filter from '../filter'
import { createRenderItem, getCoverById, getGroupId, keyExtractor } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { ItemData } from './types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { type, filter } = $.state

  const isMine = type === 'mine'
  const { list, _loaded: mineLoaded } = $.mine

  /** 已加入的小组 id, 只在全部列表计算 */
  const mineList = rakuenStore.mine.list
  const joinedIds = useMemo(() => {
    if (isMine) return new Set<number>()

    return new Set(mineList.map(item => getGroupId(item.cover)).filter(Boolean))
  }, [isMine, mineList])

  const renderItem = useMemo(() => createRenderItem(joinedIds), [joinedIds])

  const items = useMemo((): ItemData[] => {
    if (isMine) return list.map(item => ({ ...item }))

    const data = getJSON('group', [])
    const filterData = filter
      ? data.filter(item => item.t.toLowerCase().includes(filter.toLowerCase()))
      : data

    return filterData.map(item => ({
      id: item.i || item.u,
      cover: getCoverById(item.i),
      name: item.t,
      num: item.n
    }))
  }, [filter, isMine, list])

  /** 我的小组未加载完、全部未筛选时不显示空态, 避免闪一下 */
  const showEmpty = !items.length && (isMine ? !!mineLoaded : !!filter)

  return (
    <>
      {!isMine && <Filter />}
      {showEmpty ? (
        <Empty />
      ) : (
        <PaginationList
          key={type}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.container}
          data={items}
          numColumns={2}
          skipEnteringExitingAnimations={24}
          renderItem={renderItem}
        />
      )}
    </>
  )
}

export default observer(List)
