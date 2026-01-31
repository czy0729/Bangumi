/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:44:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:49:35
 */
import React from 'react'
import { Track } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Heatmaps from '../heatmaps'
import { COMPONENT, HM } from './ds'

function Extra() {
  r(COMPONENT)

  return useObserver(() => (
    <>
      <Track title='时间胶囊' hm={HM} />
      <Heatmaps />
    </>
  ))
}

export default Extra
