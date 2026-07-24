/*
 * @Author: czy0729
 * @Date: 2025-05-02 17:28:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-04 18:22:42
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { calculateRate } from '../../utils'
import Item from '../item'
import LevelFilter from '../level-filter'
import List from '../list'
import SearchInput from '../search-input'
import { cover, lv } from '../utils'

import type { PickItem } from '../types'
import type { Props } from './types'

function RightList({
  source,
  text,
  filter,
  selected,
  isStarBreak,
  sortType,
  onFilter,
  onChangeText,
  onSelect,
  onSubmitEditing,
  onToggleSort
}: Props) {
  const memoData = useMemo(() => {
    if (!source?.list?.length) return source

    let list = filter ? source.list.filter(item => String(lv(item)) === filter) : source.list
    if (sortType === 'price') {
      list = [...list].sort((a, b) => (b.current || 0) - (a.current || 0))
    } else if (sortType === 'value') {
      list = [...list].sort(
        (a, b) => (b.current || 0) / (lv(b) || 1) - (a.current || 0) / (lv(a) || 1)
      )
    }

    return { ...source, list }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sortType, source._loaded, source.list.length])

  const handleRenderItem = useCallback(
    ({ item }: { item: PickItem }) => {
      const result = []
      if (item.assets && item.assets !== item.sacrifices) {
        result.push(`${formatNumber(item.assets, 0)} (${formatNumber(item.sacrifices, 0)})`)
      } else if (item.sacrifices) {
        result.push(formatNumber(item.sacrifices, 0))
      }
      if (item.current) result.push(`₵${formatNumber(item.current, 0)}`)
      if (item.userAmount) result.push(formatNumber(item.userAmount, 0))
      if (item.rate) {
        result.push(
          `+${toFixed(item.rate, 1)} (${toFixed(
            calculateRate(item.rate, item.rank, item.stars),
            1
          )})`
        )
      }

      return (
        <Item
          type={isStarBreak ? 'ask' : 'bid'}
          id={item.id}
          src={cover(item)}
          level={lv(item)}
          name={item.name}
          extra={result.join(' / ')}
          assets={item.assets}
          sacrifices={item.sacrifices}
          rank={item.rank}
          disabled={selected?.id !== item.id}
          refine={item.refine}
          item={item}
          onPress={onSelect}
        />
      )
    },
    [isStarBreak, onSelect, selected?.id]
  )

  return (
    <>
      <Flex style={_.ml.xs}>
        <LevelFilter
          source={source}
          value={filter}
          sortType={sortType}
          onSelect={onFilter}
          onToggleSort={onToggleSort}
        />
        <Flex.Item style={_.ml.sm}>
          <SearchInput
            placeholder='目标'
            value={text}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        </Flex.Item>
      </Flex>
      <List data={memoData} renderItem={handleRenderItem} />
    </>
  )
}

export default observer(RightList)
