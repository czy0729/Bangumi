/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 06:23:04
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { ItemCatalog } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx, TabsLabel } from '../types'

function List(
  {
    id
  }: {
    id: TabsLabel
  },
  { $ }: Ctx
) {
  const catalogs = $.catalogs(id)
  const { _loaded } = catalogs
  if (!_loaded) return <Loading style={_.container.plain} />

  return (
    <ListView
      style={_.container.plain}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={catalogs}
      scrollToTop
      renderItem={({ item }) => (
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
      )}
      onHeaderRefresh={() => $.fetchCatalogs(id, true)}
      onFooterRefresh={() => $.fetchCatalogs(id)}
    />
  )
}

export default obc(List)
