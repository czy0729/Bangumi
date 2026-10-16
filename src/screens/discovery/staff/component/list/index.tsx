/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:43:14
 *
 * 新番档期目录列表
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

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { userId, userName } = $

  const handleRenderItem = useCallback(
    (arg: RenderItem<CatalogsItem>) => renderItem(arg, userId, userName),
    [userId, userName]
  )

  const catalogs = $.catalogs
  if (!catalogs._loaded) return <Loading style={_.container.plain} />

  return (
    <ListView
      ref={$.forwardRef}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      skipEnteringExitingAnimations={5}
      estimatedItemHeight={ITEM_CATALOG_HEIGHT}
      itemHeightKey={userId}
      data={catalogs}
      renderItem={handleRenderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchCatalogs}
    />
  )
}

export default observer(List)
