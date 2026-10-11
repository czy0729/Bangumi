/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 目录列表
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { ITEM_CATALOG_HEIGHT } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { CatalogsItem } from '@stores/users/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRenderItem = useCallback(
    (arg: RenderItem<CatalogsItem>) => renderItem(arg, $.userId),
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
      estimatedItemHeight={ITEM_CATALOG_HEIGHT}
      data={catalogs}
      renderItem={handleRenderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={handleHeaderRefresh}
      onFooterRefresh={handleFooterRefresh}
    />
  )
}

export default observer(List)
