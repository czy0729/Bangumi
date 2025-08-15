/*
 * @Author: czy0729
 * @Date: 2025-06-09 15:12:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 20:19:34
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ScrollView } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ITEM_MARGIN, NUM_COLUMNS } from '../../ds'
import { Ctx, List as ListType } from '../../types'
import Empty from '../empty'
import Item from '../item'
import Pagination from '../pagination'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  const handleRefresh = useCallback(() => {
    return $.getList(true)
  }, [$])

  return useObserver(() => {
    if (!$.state.show || !$.filterList.length) return null

    const width = (_.window.width - (NUM_COLUMNS + 1) * ITEM_MARGIN) / NUM_COLUMNS

    // 动态分配项目到较短的列
    const columns: {
      items: ListType
      height: number
    }[] = Array(NUM_COLUMNS)
      .fill(null)
      .map(() => ({
        items: [],
        height: 0
      }))
    $.filterList.forEach(item => {
      // 找到当前高度最小的列
      const shortestColumn = columns.reduce((prev, curr) =>
        curr.height < prev.height ? curr : prev
      )

      // 计算当前项目的高度（width / 宽高比）
      const itemHeight = width / (item.aspectRatio || 1)

      // 添加到该列，并更新列高度
      shortestColumn.items.push(item)
      shortestColumn.height += itemHeight + ITEM_MARGIN
    })

    const showMoreKeywords = !$.state.fetching && $.list.length <= 6

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        onScroll={$.onScroll}
        onRefresh={handleRefresh}
      >
        <View style={styles.wrap}>
          <View style={styles.list}>
            {columns.map((column, index) => {
              let y = 0
              return (
                <View key={`column-${index}`} style={styles.column}>
                  {column.items.map(item => {
                    const w = Math.floor(width - 4)
                    const h = Math.floor(w / (item.aspectRatio || 1))
                    y += h + ITEM_MARGIN
                    return <Item key={item.id} width={w} height={h} y={y - h} {...item} />
                  })}
                </View>
              )
            })}
          </View>
          {showMoreKeywords && <Empty showPagination={false} />}
        </View>
        <Pagination />
      </ScrollView>
    )
  })
}

export default List
