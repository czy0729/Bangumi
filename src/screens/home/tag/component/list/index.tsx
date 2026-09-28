/*
 * @Author: czy0729
 * @Date: 2022-07-30 04:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 标签条目列表: ListView, 列表/网格双布局与工具条组装
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { Notice } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, x18s } from '@utils'
import { TEXT_18X } from '@constants'
import ToolBar from '../tool-bar'
import GridItem from './grid'
import ListItem from './list'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { TagItem } from '@stores/tag/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list, hide, fixed, meta, order } = $.state
  const numColumns = list ? undefined : _.portrait(_.device(3, 4), 5)

  const elToolBar = useMemo(() => <ToolBar />, [])
  const elListHeaderComponent = useMemo(
    () => (
      <>
        {!fixed && elToolBar}
        {order === 'rank' && !meta && (
          <Notice>
            因标签为用户自行添加，
            「按排名」排序在热门标签下可能毫无意义，推荐「按收藏」排序，也可点击右上角进入「分类排名」以获取更准确的快照数据。
          </Notice>
        )}
      </>
    ),
    [elToolBar, fixed, meta, order]
  )

  const renderItem = useCallback(
    ({ item, index }: RenderItem<TagItem>) =>
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
          ListHeaderComponent={elListHeaderComponent}
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
}

export default observer(List)
