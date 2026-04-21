/*
 * @Author: czy0729
 * @Date: 2024-11-01 08:32:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-31 05:19:25
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
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

  const { _loaded, collectRankSort } = $.state
  if (!_loaded) return null

  const styles = memoStyles()

  return (
    <>
      <SegmentedControl
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
}

export default observer(HotList)
