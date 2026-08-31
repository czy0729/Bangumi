/*
 * @Author: czy0729
 * @Date: 2026-08-31 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 16:00:00
 *
 * 评分月刊列表: 分块摊平 + ListView 虚拟化
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import BlockNewItem from '../block-new/item'
import BlockTrendItem from '../block-trend/item'
import Pagination from '../pagination'
import Title from '../title'
import { getFlatList } from './utils'
import { COMPONENT, ITEM_ESTIMATE_HEIGHT } from './ds'
import { memoStyles } from './styles'

import type { ListEmpty } from '@types'
import type { FlatItem, Props } from './types'

/** 评分月刊列表 */
function List({ data, index, scrollToRef, onSelect, onScroll }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  const current = data[index]

  const handleRenderItem = useCallback(({ item }: { item: FlatItem }) => {
    if (item.type === 'header') {
      return (
        <View style={_.mt.lg}>
          <Title text={item.title} />
        </View>
      )
    }

    if (item.type === 'new') {
      return <BlockNewItem item={item.item} index={item.index} />
    }

    return <BlockTrendItem item={item.item} index={item.index} />
  }, [])

  const handleKeyExtractor = useCallback((item: FlatItem) => item.key, [])

  const list = getFlatList(current.data)

  const elHeader = useMemo(
    () => (
      <Title
        text={`${current.title} (${current.desc})`.replace('日到', '至')}
        size='primary'
      />
    ),
    [current.title, current.desc]
  )

  const elFooter = useMemo(
    () => <Pagination data={data} index={index} onSelect={onSelect} />,
    [data, index, onSelect]
  )

  return (
    <ListView
      ref={scrollToRef}
      keyExtractor={handleKeyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      onScroll={onScroll}
      data={{ list, _loaded: 1 } as ListEmpty<FlatItem>}
      renderItem={handleRenderItem}
      estimatedItemHeight={ITEM_ESTIMATE_HEIGHT}
      itemHeightKey={index}
      ListHeaderComponent={elHeader}
      ListFooterComponent={elFooter}
    />
  )
}

export default observer(List)
