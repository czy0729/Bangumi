/*
 * @Author: czy0729
 * @Date: 2019-06-03 00:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:04:38
 */
import { observer } from 'mobx-react'
import { _, useStore } from '@stores'
import Jobs from './jobs'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function JobsWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  if (!$.jobs.length) return null

  return <Jobs styles={memoStyles()} navigation={navigation} style={_.mt.md} jobs={$.jobs} />
}

export default observer(JobsWrap)
