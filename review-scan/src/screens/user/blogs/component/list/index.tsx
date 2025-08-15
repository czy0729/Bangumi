/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:05:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:36:10
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { ItemBlog } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'

function List() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()
  const renderItem = useCallback(
    ({ item, index }) => <ItemBlog navigation={navigation} event={EVENT} index={index} {...item} />,
    [navigation]
  )

  return useObserver(() => (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.page}
      data={$.blogs}
      renderItem={renderItem}
      onHeaderRefresh={$.refresh}
      onFooterRefresh={$.fetchBlogs}
    />
  ))
}

export default List
