/*
 * @Author: czy0729
 * @Date: 2025-05-02 17:28:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-04 18:22:42
 */
import React, { useCallback, useMemo } from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { useObserver } from '@utils/hooks'
import { PickItem } from '../types'
import { calculateRate } from '../../utils'
import Item from '../item'
import LevelFilter from '../level-filter'
import List from '../list'
import SearchInput from '../search-input'
import { cover, lv } from '../utils'
import { Props } from './types'

const RightList = React.memo(function ({
  source,
  text,
  filter,
  selected,
  isStarBreak,
  onFilter,
  onChangeText,
  onSelect,
  onSubmitEditing
}: Props) {
  const memoData = useMemo(() => {
    if (!filter || !source?.list?.length) return source

    return {
      ...source,
      list: source.list.filter(item => String(lv(item)) === filter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, source._loaded, source.list.length])

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

  return useObserver(() => (
    <>
      <Flex style={_.ml.xs}>
        <LevelFilter source={source} value={filter} onSelect={onFilter} />
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
  ))
})

export default RightList
