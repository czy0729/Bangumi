/*
 * @Author: czy0729
 * @Date: 2024-11-01 08:32:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-31 20:51:12
 */
import React, { useCallback } from 'react'
import { SegmentedControl } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT, DS } from './ds'
import { memoStyles } from './styles'

import type { CollectRankItem, Ctx } from '../../types'

function HotList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePage = useCallback(
    (nextPageData: CollectRankItem[]) => $.onPageMemo(nextPageData.map(item => item.topic_id)),
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()
    const { collectRankSort } = $.state

    return (
      <>
        <SegmentedControl
          key={collectRankSort}
          style={styles.segment}
          size={11}
          values={DS}
          selectedIndex={DS.findIndex(item => item === collectRankSort)}
          onValueChange={$.onCollectRankSortChange}
        />
        <PaginationList2
          keyExtractor={keyExtractor}
          contentContainerStyle={_.container.bottom}
          data={$.collectRank}
          limit={12}
          renderItem={renderItem}
          onPage={handlePage}
        />
      </>
    )
  })
}

export default HotList
