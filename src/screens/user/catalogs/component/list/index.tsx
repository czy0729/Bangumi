/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 21:42:20
 */
import React, { useCallback } from 'react'
import { ListView, Loading } from '@components'
import { ItemCatalog } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx, TabsLabel } from '../../types'
import { COMPONENT } from './ds'

function List(
  {
    id
  }: {
    id: TabsLabel
  },
  { $ }: Ctx
) {
  r(COMPONENT)

  const renderItem = useCallback(
    ({ item }) => (
      <ItemCatalog
        {...item}
        isUser
        event={{
          id: '用户目录.跳转',
          data: {
            userId: $.userId
          }
        }}
      />
    ),
    []
  )
  const handleHeaderRefresh = useCallback(() => $.fetchCatalogs(id, true), [])
  const handleFooterRefresh = useCallback(() => $.fetchCatalogs(id), [])

  return useObserver(() => {
    const catalogs = $.catalogs(id)
    if (!catalogs._loaded) return <Loading style={_.container.plain} />

    return (
      <ListView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={catalogs}
        scrollToTop
        renderItem={renderItem}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={handleFooterRefresh}
      />
    )
  })
}

export default c(List)
