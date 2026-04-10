/*
 * @Author: czy0729
 * @Date: 2024-08-09 20:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:06:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { COLLECT_DS } from '../../ds'
import { COLLECT_DATA } from './ds'

import type { Ctx } from '../../types'

function Collect() {
  const { $ } = useStore<Ctx>()

  const text = COLLECT_DS.find(item => item.key === $.state.collect)?.['title']

  return (
    <ToolBar.Popover
      data={COLLECT_DATA}
      icon='md-bookmark-outline'
      iconColor={_.colorDesc}
      iconSize={17}
      text={text === '全部' ? '收藏' : text}
      type='desc'
      onSelect={$.onToggleCollect}
    />
  )
}

export default observer(Collect)
