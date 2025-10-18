/*
 * @Author: czy0729
 * @Date: 2021-07-15 23:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:49:26
 */
import React from 'react'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Today from './today'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function TodayWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!systemStore.setting.discoveryTodayOnair || !$.todayBangumi.length) return null

    return <Today styles={memoStyles()} todayBangumi={$.todayBangumi} />
  })
}

export default TodayWrap
