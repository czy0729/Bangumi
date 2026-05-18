/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-18 21:13:54
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { getDividerIndex, renderItem, renderItemRecents } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Characters, Recents } from '@stores/users/types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchList(id, true), [$, id])
  const handleFooterRefresh = useCallback(() => $.fetchList(id), [$, id])

  const list = $.list(id)
  if (!list._loaded) return null

  const styles = memoStyles()

  const commonProps = {
    keyExtractor,
    contentContainerStyle: styles.contentContainerStyle,
    onScroll: $.onScroll,
    onHeaderRefresh: handleHeaderRefresh,
    onFooterRefresh: handleFooterRefresh
  } as const

  if (id === 'recents') {
    const dividerIndex = getDividerIndex(list as Recents)
    return (
      <ListView
        ref={$.forwardRef}
        {...commonProps}
        data={list as Recents}
        renderItem={renderItemRecents(dividerIndex)}
      />
    )
  }

  return (
    <ListView
      {...commonProps}
      numColumns={_.portrait(5, 8)}
      data={list as Characters}
      renderItem={renderItem}
    />
  )
}

export default observer(List)
