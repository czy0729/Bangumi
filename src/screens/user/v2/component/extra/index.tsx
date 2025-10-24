/*
 * @Author: czy0729
 * @Date: 2023-12-31 11:12:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:38:00
 */
import React from 'react'
import { Track } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Heatmaps from '../heatmaps'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <>
      <Track title='时光机' hm={$.hm} />
      <Heatmaps />
    </>
  ))
}

export default Extra
