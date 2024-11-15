/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:42:59
 */
import React from 'react'
import { View } from 'react-native'
import { ToolBar as ToolBarComp } from '@components'
import { systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
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
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { list } = $.state
  const { userPagination } = systemStore.setting
  return (
    <View style={stl(styles.container, list && styles.list)}>
      <ToolBarComp>
        <Sort />
        <Tag page={page} />
        {userPagination && <Pagination pageCurrent={pageCurrent} pageTotal={pageTotal} />}
        <Search />
        <More
          onRefreshOffset={() => {
            if (typeof onRefreshOffset === 'function') onRefreshOffset()
            $.onRefreshOffset()
          }}
        />
      </ToolBarComp>
      <Filter page={page} />
    </View>
  )
}

export default ob(ToolBar, COMPONENT)
