/*
 * @Author: czy0729
 * @Date: 2024-01-04 17:45:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 */
import { observer } from 'mobx-react'
import { Track } from '@components'
import { r } from '@utils/dev'
import Heatmaps from '../heapmaps'
import { COMPONENT, HM } from './ds'

function Extra() {
  r(COMPONENT)

  return (
    <>
      <Track title='超展开' hm={HM} />
      <Heatmaps />
    </>
  )
}

export default observer(Extra)
