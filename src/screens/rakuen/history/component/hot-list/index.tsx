/*
 * @Author: czy0729
 * @Date: 2024-11-01 08:32:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { PaginationList } from '@_'
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

  const styles = memoStyles()

  const { _loaded, collectRankSort } = $.state
  if (!_loaded) return null

  return (
    <>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={DS}
        selectedIndex={DS.findIndex(item => item === collectRankSort)}
        onValueChange={$.onCollectRankSortChange}
      />
      <PaginationList
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        data={$.collectRank}
        limit={12}
        skipEnteringExitingAnimations={12}
        renderItem={renderItem}
        onPage={handlePage}
      />
    </>
  )
}

export default observer(HotList)
