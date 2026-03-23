/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:44:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:49:35
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Track } from '@components'
import { r } from '@utils/dev'
import Heatmaps from '../heatmaps'
import { COMPONENT, HM } from './ds'

function Extra() {
  r(COMPONENT)

  return (
    <>
      <Track title='时间胶囊' hm={HM} />
      <Heatmaps />
    </>
  )
}

export default observer(Extra)
