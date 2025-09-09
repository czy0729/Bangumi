/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 21:54:22
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { renderItem, renderItemRecents } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchList(id, true), [$, id])
  const handleFooterRefresh = useCallback(() => $.fetchList(id), [$, id])

  return useObserver(() => {
    const list = $.list(id)
    if (!list._loaded) return null

    const styles = memoStyles()
    const isRecents = id === 'recents'
    const numColumns = isRecents ? undefined : _.portrait(5, 8)
    return (
      <ListView
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={numColumns}
        data={list}
        renderItem={isRecents ? renderItemRecents : renderItem}
        onScroll={$.onScroll}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={handleFooterRefresh}
      />
    )
  })
}

export default List
