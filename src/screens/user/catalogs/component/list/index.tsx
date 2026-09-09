/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:57:08
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { ItemCatalog } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { COMPONENT } from './ds'

import type { CatalogsItem } from '@stores/users/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRenderItem = useCallback(
    ({ item, index }: RenderItem<CatalogsItem>) => (
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
    [$]
  )
  const handleHeaderRefresh = useCallback(() => $.fetchCatalogs(id, true), [$, id])
  const handleFooterRefresh = useCallback(() => $.fetchCatalogs(id), [$, id])

  const catalogs = $.catalogs(id)
  if (!catalogs._loaded) return <Loading style={_.container.plain} />

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={catalogs}
      renderItem={handleRenderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={handleHeaderRefresh}
      onFooterRefresh={handleFooterRefresh}
    />
  )
}

export default observer(List)
