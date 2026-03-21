/*
 * @Author: czy0729
 * @Date: 2021-07-15 23:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 21:22:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore, useStore } from '@stores'
import Today from './today'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function TodayWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!systemStore.setting.discoveryTodayOnair) return null

  return <Today styles={memoStyles()} todayBangumi={$.todayBangumi} />
}

export default observer(TodayWrap)
