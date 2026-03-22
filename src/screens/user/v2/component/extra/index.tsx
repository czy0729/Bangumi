/*
 * @Author: czy0729
 * @Date: 2023-12-31 11:12:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:01:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Track } from '@components'
import { useStore } from '@stores'
import Heatmaps from '../heatmaps'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <>
      <Track title='时光机' hm={$.hm} />
      <Heatmaps />
    </>
  )
}

export default observer(Extra)
