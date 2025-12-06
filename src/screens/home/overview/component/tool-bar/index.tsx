/*
 * @Author: czy0729
 * @Date: 2025-12-05 06:54:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-07 05:07:44
 */
import React, { useCallback, useMemo } from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, LEFT_SPLIT, RIGHT_SPLIT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (value: string) => {
      let [text] = value.split(LEFT_SPLIT)
      if (text === '全部') text = ''

      $.onFilter(text)
    },
    [$]
  )

  return useObserver(() => {
    const { list } = $

    const memoData = useMemo(() => {
      if (!list.length) return []

      const result: {
        desc: string
        count: number
      }[] = [
        {
          desc: '全部',
          count: list.length
        }
      ]
      const map = new Map()

      list.forEach(item => {
        if (!item.desc) return

        if (!map.has(item.desc)) {
          map.set(item.desc, {
            desc: item.desc,
            count: 1
          })
          result.push(map.get(item.desc))
        } else {
          map.get(item.desc).count += 1
        }
      })

      return result.map(item => `${item.desc}${LEFT_SPLIT}${item.count}${RIGHT_SPLIT}`)
    }, [list])
    if (!memoData.length) return null

    const styles = memoStyles()

    const { filter } = $.state
    let text = ''
    if (filter) {
      const find = memoData.find(item => {
        const [temp] = item.split(LEFT_SPLIT)
        return temp === filter
      })
      if (find) text = find
    }

    return (
      <ToolBarComp style={styles.toolBar}>
        <ToolBarComp.Popover
          data={memoData}
          text={text || memoData[0]}
          type='desc'
          onSelect={handleSelect}
        />
      </ToolBarComp>
    )
  })
}

export default ToolBar
