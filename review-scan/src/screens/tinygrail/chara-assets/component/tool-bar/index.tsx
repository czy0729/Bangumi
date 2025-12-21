/*
 * @Author: czy0729
 * @Date: 2024-03-05 02:59:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:16:49
 */
import React from 'react'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import { SORT_CHARA_DS, SORT_DS, SORT_TEMPLE_DS } from '../../ds'
import { Ctx } from '../../types'
import BatchBtn from '../batch-btn'
import { COMPONENT } from './ds'

function ToolBar() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { page, direction } = $.state
    if (page > 2) return null

    const isTemple = page === 2
    const isChara = page === 1

    const levelKey = isTemple ? 'templeLevel' : 'level'
    const levelMapKey = isTemple ? 'templeLevelMap' : 'levelMap'
    const sortKey = isTemple ? 'templeSort' : 'sort'

    const passProps = {
      data: isTemple ? SORT_TEMPLE_DS : isChara ? SORT_CHARA_DS : SORT_DS,
      level: $.state[levelKey],
      levelMap: $[levelMapKey],
      sort: $.state[sortKey],
      direction,
      renderLeft: <BatchBtn />,
      onLevelSelect: (value: string) => $.onLevelSelect(value, levelKey),
      onSortPress: (value: string) => $.onSortPress(value, sortKey),
      onSortLongPress: () => $.onSortLongPress(sortKey)
    } as const

    return <TinygrailToolBar key={String(page)} {...passProps} />
  })
}

export default ToolBar
