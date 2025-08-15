/*
 * @Author: czy0729
 * @Date: 2025-05-02 05:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-04 18:22:41
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

const LeftList = React.memo(
  ({
    source,
    text,
    filter,
    selected,
    isTemple,
    isStarDust,
    onFilter,
    onChangeText,
    onSelect
  }: Props) => {
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
        if (!isStarDust) {
          if (item.assets !== (item.sacrifices || item.state)) {
            result.push(
              `${formatNumber(item.assets, 0)} (${formatNumber(item.sacrifices || item.state, 0)})`
            )
          } else {
            result.push(formatNumber(item.sacrifices || item.state, 0))
          }
        } else if (isTemple) {
          result.push(formatNumber(item.sacrifices || item.state, 0))
        } else {
          result.push(formatNumber(item.state, 0))
        }
        if (item.current) result.push(`₵${formatNumber(item.current, 0)}`)
        result.push(
          `+${toFixed(item.rate, 1)} (${toFixed(
            calculateRate(item.rate, item.rank, item.stars),
            1
          )})`
        )

        return (
          <Item
            type='ask'
            id={item.id}
            src={cover(item)}
            level={lv(item)}
            name={item.name}
            rank={item.rank}
            extra={result.join(' / ')}
            assets={item.assets}
            sacrifices={item.sacrifices}
            disabled={selected?.id !== item.id}
            refine={item.refine}
            item={item}
            onPress={onSelect}
          />
        )
      },
      [isStarDust, isTemple, onSelect, selected?.id]
    )

    return useObserver(() => (
      <>
        <Flex style={_.ml.xs}>
          <LevelFilter source={source} value={filter} onSelect={onFilter} />
          <Flex.Item style={_.ml.sm}>
            <SearchInput placeholder='消耗' value={text} onChangeText={onChangeText} />
          </Flex.Item>
        </Flex>
        <List data={memoData} renderItem={handleRenderItem} />
      </>
    ))
  }
)

export default LeftList
