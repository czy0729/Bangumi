/*
 * @Author: czy0729
 * @Date: 2019-06-03 00:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-20 14:32:55
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Jobs from './jobs'
import { memoStyles } from './styles'

export default obc(({ style }, { $, navigation }: Ctx) => {
  // global.rerender('Mono.Jobs')

  if (!$.jobs.length) return null

  return (
    <Jobs styles={memoStyles()} navigation={navigation} style={style} jobs={$.jobs} />
  )
})
