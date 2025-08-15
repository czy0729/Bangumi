/*
 * @Author: czy0729
 * @Date: 2024-08-09 20:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:23:31
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { COLLECT_DS } from '../../ds'
import { Ctx } from '../../types'
import { COLLECT_DATA } from './ds'

function Collect() {
  const { $ } = useStore<Ctx>()
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

export default ob(Collect)
