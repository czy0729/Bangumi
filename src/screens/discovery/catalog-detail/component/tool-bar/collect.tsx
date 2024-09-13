/*
 * @Author: czy0729
 * @Date: 2024-08-09 20:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 23:21:13
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { COLLECT_DS } from '../../ds'
import { Ctx } from '../../types'
import { COLLECT_DATA } from './ds'

function Collect(_props, { $ }: Ctx) {
  const text = COLLECT_DS.find(item => item.key === $.state.collect)?.['title']
  return (
    <ToolBar.Popover
      data={COLLECT_DATA}
      text={text === '全部' ? '收藏' : text}
      type='desc'
      onSelect={$.onToggleCollect}
    />
  )
}

export default obc(Collect)
