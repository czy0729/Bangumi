/*
 * @Author: czy0729
 * @Date: 2025-06-09 15:12:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 列表
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { HeaderPlaceholder } from '@components'
import { ScrollView } from '@_'
import { _, useStore } from '@stores'
import { ITEM_GAP, ITEM_MARGIN } from '../../ds'
import Item from '../item'
import Keywords from '../keywords'
import Pagination from '../pagination'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx, List as ListType } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRefresh = useCallback(() => {
    return $.getList(true)
  }, [$])

  if (!$.state.show || !$.filterList.length) return null

  const numColumns = _.device(2, _.portrait(3, 4))
  const width = (_.window.width - (numColumns + 1) * ITEM_MARGIN) / numColumns
  const itemWidth = Math.floor(width - ITEM_GAP)

  // 依次放入当前最矮的列, 高度相等时选索引更大的列以实现交替分配
  const columns: {
    items: ListType[number][]
    height: number
  }[] = Array.from({ length: numColumns }, () => ({
    items: [],
    height: 0
  }))

  $.filterList.forEach(item => {
    let shortest = 0
    columns.forEach((column, index) => {
      const target = columns[shortest]
      if (column.height < target.height) shortest = index
      if (column.height === target.height && index > shortest) shortest = index
    })

    columns[shortest].items.push(item)
    columns[shortest].height += width / (item.aspectRatio || 1) + ITEM_MARGIN
  })

  const showMoreKeywords = !$.state.fetching && $.list.length <= 6

  const styles = memoStyles()

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={$.onScroll}
      onRefresh={handleRefresh}
    >
      <View style={styles.wrap}>
        <HeaderPlaceholder />

        <View style={styles.list}>
          {columns.map((column, index) => {
            let y = 0
            return (
              <View key={`column-${index}`} style={styles.column}>
                {column.items.map(item => {
                  const h = Math.floor(itemWidth / (item.aspectRatio || 1))
                  y += h + ITEM_MARGIN

                  return (
                    <Item
                      key={item.id}
                      id={item.id}
                      tags={item.tags}
                      width={itemWidth}
                      height={h}
                      y={y - h}
                    />
                  )
                })}
              </View>
            )
          })}
        </View>
        {showMoreKeywords && <Keywords />}
      </View>

      <Pagination />
    </ScrollView>
  )
}

export default observer(List)
