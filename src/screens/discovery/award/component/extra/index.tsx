/*
 * @Author: czy0729
 * @Date: 2024-02-12 01:36:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 *
 * 页面埋点与热力图
 */
import { observer } from 'mobx-react'
import { Heatmap, Track } from '@components'
import { r } from '@utils/dev'
import { EVENT } from '../../ds'
import { COMPONENT } from './ds'

import type { Props } from './types'

function Extra({ year }: Props) {
  r(COMPONENT)

  return (
    <>
      <Track title={EVENT.screen} hm={[`award/${year}`, 'Award']} />
      <Heatmap id={EVENT.screen} screen='Award' />
      <Heatmap right={80} bottom={40} id={EVENT.id} transparent />
    </>
  )
}

export default observer(Extra)
