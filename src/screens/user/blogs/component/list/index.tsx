/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:05:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 06:23:47
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { ItemBlog } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleRenderItem = useCallback(
    ({ item, index }) => <ItemBlog navigation={navigation} event={EVENT} index={index} {...item} />,
    [navigation]
  )

  return useObserver(() => (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.blogs}
      renderItem={handleRenderItem}
      onHeaderRefresh={$.refresh}
      onFooterRefresh={$.fetchBlogs}
    />
  ))
}

export default List
