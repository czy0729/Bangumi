/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:05:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:56:52
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ItemBlog } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleRenderItem = useCallback(
    ({ item, index }) => <ItemBlog navigation={navigation} event={EVENT} index={index} {...item} />,
    [navigation]
  )

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.blogs}
      renderItem={handleRenderItem}
      onHeaderRefresh={$.refresh}
      onFooterRefresh={$.fetchBlogs}
    />
  )
}

export default observer(List)
