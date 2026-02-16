/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-13 20:55:10
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ToolBar as ToolBarComp } from '@components'
import { systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Filter from '../filter'
import More from './more'
import Pagination from './pagination'
import Search from './search'
import Sort from './sort'
import Tag from './tag'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ToolBar({ page, pageCurrent, pageTotal, onRefreshOffset = undefined }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const handleRefreshOffset = useCallback(() => {
    if (typeof onRefreshOffset === 'function') onRefreshOffset()
    $.onRefreshOffset()
  }, [$, onRefreshOffset])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View style={stl(styles.container, $.state.list && styles.list)}>
        <ToolBarComp>
          <Sort />
          <Tag page={page} />
          {systemStore.setting.userPagination && (
            <Pagination pageCurrent={pageCurrent} pageTotal={pageTotal} />
          )}
          <Search />
          <More onRefreshOffset={handleRefreshOffset} />
        </ToolBarComp>
        <Filter page={page} />
      </View>
    )
  })
}

export default ToolBar
