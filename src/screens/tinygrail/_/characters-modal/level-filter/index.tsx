/*
 * @Author: czy0729
 * @Date: 2025-05-02 16:25:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 00:52:50
 */
import React, { useCallback, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { HIT_SLOP } from '../ds'
import { lv } from '../utils'

import type { Props } from './types'

function LevelFilter({ source, value, sortType, onSelect, onToggleSort }: Props) {
  const memoMap = useMemo(() => {
    const { list } = source
    const data = {}

    try {
      ;(list || []).forEach(item => {
        const level = lv(item) || 0
        data[level] ? (data[level] += 1) : (data[level] = 1)
      })
    } catch {}

    return data
  }, [source])

  // 如果 value 不为空且 memoMap 里没有这个 key，说明没有重叠
  const hasOverlap = value === '' || memoMap.hasOwnProperty(value)
  const activeValue = hasOverlap ? value : ''

  // 如果发生不匹配，强制同步父组件状态
  useEffect(() => {
    if (!hasOverlap) onSelect('')
  }, [hasOverlap, onSelect])

  const memoData = useMemo(() => {
    const sum = Object.keys(memoMap).reduce((total, level) => total + memoMap[level], 0)
    const sortedLevels = Object.keys(memoMap).sort((a, b) => Number(a) - Number(b))
    const items = [`全部 (${sum})`]
    if (onToggleSort) {
      items.push(`价格降序${sortType === 'price' ? ' ✓' : ''}`)
      items.push(`性价比降序${sortType === 'value' ? ' ✓' : ''}`)
    }
    return [...items, ...sortedLevels.map(level => `lv${level} (${memoMap[level]})`)]
  }, [memoMap, sortType, onToggleSort])

  const handleSelect = useCallback(
    (title: string) => {
      if (title.startsWith('价格降序')) {
        onToggleSort?.('price')
        return
      }
      if (title.startsWith('性价比降序')) {
        onToggleSort?.('value')
        return
      }
      const lvPart = title.split(' ')[0]
      onSelect(lvPart === '全部' ? '' : lvPart.replace('lv', ''))
    },
    [onSelect, onToggleSort]
  )

  const isActive = !!activeValue || !!sortType

  return (
    <Popover.Old data={memoData} hitSlop={HIT_SLOP} onSelect={handleSelect}>
      <Flex justify='center'>
        <Iconfont
          name={sortType ? 'md-sort' : 'md-filter-list'}
          size={14}
          color={isActive ? _.colorAsk : _.colorTinygrailText}
        />
        <Text style={_.ml.xs} size={10} type={activeValue ? 'ask' : 'tinygrailText'}>
          {activeValue ? `lv${activeValue}` : '等级'}
          {memoMap[activeValue] ? ` (${memoMap[activeValue]})` : ''}
        </Text>
      </Flex>
    </Popover.Old>
  )
}

export default observer(LevelFilter)
