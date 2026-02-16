/*
 * @Author: czy0729
 * @Date: 2025-05-02 16:25:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:35
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { HIT_SLOP } from '../ds'
import { lv } from '../utils'
import { Props } from './types'

function LevelFilter({ source, value, onSelect }: Props) {
  const memoMap = useMemo(() => {
    const { list } = source
    const data = {}

    try {
      ;(list || []).forEach(item =>
        data[lv(item) || 0] ? (data[lv(item) || 0] += 1) : (data[lv(item) || 0] = 1)
      )
    } catch (error) {
      console.error(error)
    }

    return data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source._loaded, source.list.length])

  const memoData = useMemo(() => {
    const sum = Object.keys(memoMap).reduce((total, level) => total + memoMap[level], 0)
    return [`全部 (${sum})`, ...Object.keys(memoMap).map(level => `lv${level} (${memoMap[level]})`)]
  }, [memoMap])

  const handleSelect = useCallback(
    (title: string) => {
      const lv = title.split(' ')[0]
      onSelect(lv === '全部' ? '' : lv.replace('lv', ''))
    },
    [onSelect]
  )

  return useObserver(() => (
    <Popover.Old data={memoData} hitSlop={HIT_SLOP} onSelect={handleSelect}>
      <Flex justify='center'>
        <Iconfont
          name='md-filter-list'
          size={14}
          color={value ? _.colorAsk : _.colorTinygrailText}
        />
        <Text style={_.ml.xs} size={10} type={value ? 'ask' : 'tinygrailText'}>
          {value ? `lv${value}` : '等级'}
          {memoMap[value] ? ` (${memoMap[value]})` : ''}
        </Text>
      </Flex>
    </Popover.Old>
  ))
}

export default LevelFilter
