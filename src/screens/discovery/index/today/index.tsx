/*
 * @Author: czy0729
 * @Date: 2021-07-15 23:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 04:35:50
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Today from './today'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  rerender('Discovery.Today')

  if (!$.discoveryTodayOnair || !$.todayBangumi.length) return null

  return <Today styles={memoStyles()} todayBangumi={$.todayBangumi} />
})
