/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 21:19:14
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, Track } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import LinkModal from '../link-modal'
import { COMPONENT, HM } from './ds'

function Extra() {
  r(COMPONENT)

  return (
    <>
      <LinkModal />
      <Track title='发现' hm={HM} />
      <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
    </>
  )
}

export default observer(Extra)
