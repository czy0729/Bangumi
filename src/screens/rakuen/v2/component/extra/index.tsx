/*
 * @Author: czy0729
 * @Date: 2024-01-04 17:45:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 17:46:30
 */
import React from 'react'
import { Track } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Heatmaps from '../heapmaps'
import { COMPONENT, HM } from './ds'

function Extra() {
  r(COMPONENT)

  return useObserver(() => (
    <>
      <Track title='超展开' hm={HM} />
      <Heatmaps />
    </>
  ))
}

export default Extra
