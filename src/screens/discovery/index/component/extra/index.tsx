/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import { observer } from 'mobx-react'
import { Heatmap, Track } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT, HM } from './ds'

function Extra() {
  r(COMPONENT)

  return (
    <>
      <Track title='发现' hm={HM} />
      <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
    </>
  )
}

export default observer(Extra)
