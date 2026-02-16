/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:38:43
 */
import React, { useCallback } from 'react'
import { ListView, Loading } from '@components'
import { ItemCatalog } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx, TabsLabel } from '../../types'
import { COMPONENT } from './ds'

function List({ id }: { id: TabsLabel }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const renderItem = useCallback(
    ({ item, index }) => (
      <ItemCatalog
        {...item}
        index={index}
        isUser
        event={{
          id: '用户目录.跳转',
          data: {
            userId: $.userId
          }
        }}
      />
    ),
    [$.userId]
  )
  const handleHeaderRefresh = useCallback(() => $.fetchCatalogs(id, true), [$, id])
  const handleFooterRefresh = useCallback(() => $.fetchCatalogs(id), [$, id])

  return useObserver(() => {
    const catalogs = $.catalogs(id)
    if (!catalogs._loaded) return <Loading style={_.container.plain} />

    return (
      <ListView
        keyExtractor={keyExtractor}
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        data={catalogs}
        renderItem={renderItem}
        onScroll={$.onScroll}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={handleFooterRefresh}
      />
    )
  })
}

export default List
