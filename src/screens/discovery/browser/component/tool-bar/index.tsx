/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:58:30
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Back from './back'
import Filter from './filter'
import Month from './month'
import Next from './next'
import Year from './year'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ToolBarComp style={!$.isList && _.mb.xs}>
      <Filter />
      <Back />
      <Year />
      <Month />
      <Next />
    </ToolBarComp>
  ))
}

export default ToolBar
