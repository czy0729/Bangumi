/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:05:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 15:11:18
 *
 * 日志列表
 */
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_BLOG_HEIGHT } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.blogs}
      estimatedItemHeight={ITEM_BLOG_HEIGHT}
      renderItem={renderItem}
      onHeaderRefresh={$.refresh}
      onFooterRefresh={$.fetchBlogs}
    />
  )
}

export default observer(List)
