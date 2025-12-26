/*
 * @Author: czy0729
 * @Date: 2022-07-30 04:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:23:38
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { Notice } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, x18s } from '@utils'
import { useObserver } from '@utils/hooks'
import { TEXT_18X } from '@constants'
import ToolBar from '../tool-bar'
import GridItem from './grid'
import ListItem from './list'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { list, hide, fixed } = $.state
    const numColumns = list ? undefined : _.portrait(3, 5)
    const elToolBar = <ToolBar />
    const renderItem = useCallback(
      ({ item, index }) =>
        list ? (
          <ListItem item={item} index={index} />
        ) : (
          <GridItem item={item} index={index} numColumns={numColumns} />
        ),
      [list, numColumns]
    )

    return (
      <>
        {fixed && elToolBar}
        {!!$.list._loaded && !hide && (
          <ListView
            key={`${_.orientation}${numColumns}`}
            keyExtractor={keyExtractor}
            contentContainerStyle={!fixed ? styles.contentContainerStyle : _.container.bottom}
            numColumns={numColumns}
            data={$.list}
            ListHeaderComponent={
              <>
                {!fixed && elToolBar}
                {$.state.order === 'rank' && !$.state.meta && (
                  <Notice>
                    因标签为用户自行添加，
                    「按排名」排序在关联条目过多情况下可能毫无意义，推荐「按收藏」排序。
                  </Notice>
                )}
              </>
            }
            renderItem={renderItem}
            footerEmptyDataText={x18s($.params.tag) ? TEXT_18X : undefined}
            scrollEventThrottle={16}
            onScroll={$.onScroll}
            onHeaderRefresh={$.onHeaderRefresh}
            onFooterRefresh={$.onFooterRefresh}
          />
        )}
      </>
    )
  })
}

export default List
