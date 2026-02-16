/*
 * @Author: czy0729
 * @Date: 2019-06-03 00:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:04:38
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Jobs from './jobs'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function JobsWrap({ style }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.jobs.length) return null

  return <Jobs styles={memoStyles()} navigation={navigation} style={style} jobs={$.jobs} />
}

export default ob(JobsWrap, COMPONENT)
