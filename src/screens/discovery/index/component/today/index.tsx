/*
 * @Author: czy0729
 * @Date: 2021-07-15 23:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 11:22:04
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Today from './today'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TodayWrap(_props, { $ }: Ctx) {
  if (!systemStore.setting.discoveryTodayOnair || !$.todayBangumi.length) return null

  return <Today styles={memoStyles()} todayBangumi={$.todayBangumi} />
}

export default obc(TodayWrap, COMPONENT)
