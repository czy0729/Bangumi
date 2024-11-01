/*
 * @Author: czy0729
 * @Date: 2024-11-01 08:32:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 13:33:15
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const DS = ['收藏数', '最近'] as const

function HotList(_props, { $ }: Ctx) {
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
        onPage={nextPageData => $.onPageMemo(nextPageData.map(item => item.topic_id))}
      />
    </>
  )
}

export default obc(HotList, COMPONENT)
