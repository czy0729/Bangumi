/*
 * @Author: czy0729
 * @Date: 2025-05-02 16:25:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:35
 */
import React, { useCallback, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { HIT_SLOP } from '../ds'
import { lv } from '../utils'

import type { Props } from './types'

function LevelFilter({ source, value, onSelect }: Props) {
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
    return [`全部 (${sum})`, ...sortedLevels.map(level => `lv${level} (${memoMap[level]})`)]
  }, [memoMap])

  const handleSelect = useCallback(
    (title: string) => {
      const lvPart = title.split(' ')[0]
      onSelect(lvPart === '全部' ? '' : lvPart.replace('lv', ''))
    },
    [onSelect]
  )

  return (
    <Popover.Old data={memoData} hitSlop={HIT_SLOP} onSelect={handleSelect}>
      <Flex justify='center'>
        <Iconfont
          name='md-filter-list'
          size={14}
          color={activeValue ? _.colorAsk : _.colorTinygrailText}
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
