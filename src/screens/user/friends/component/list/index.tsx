/*
 * @Author: czy0729
 * @Date: 2024-04-10 14:30:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:50:25
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        data={$.list}
        numColumns={$.numColumns}
        limit={$.numColumns * 7}
        renderItem={renderItem}
        onHeaderRefresh={$.fetchFriends}
        onScroll={$.onScroll}
      />
    )
  })
}

export default List
