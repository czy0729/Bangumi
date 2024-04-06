/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 16:13:10
 */
import React, { useCallback } from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { renderItem, renderItemRecents } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List({ id }, { $ }: Ctx) {
  r(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchList(id, true), [])
  const handleFooterRefresh = useCallback(() => $.fetchList(id), [])

  return useObserver(() => {
    const list = $.list(id)
    if (!list._loaded) return <Loading />

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
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={handleFooterRefresh}
      />
    )
  })
}

export default c(List)
