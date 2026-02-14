/*
 * @Author: czy0729
 * @Date: 2024-02-12 01:36:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 01:39:56
 */
import React from 'react'
import { Heatmap, Track } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

function Extra({ year }) {
  r(COMPONENT)

  return useObserver(() => (
    <>
      <Track title='年鉴' hm={[`award/${year}`, 'Award']} />
      <Heatmap id='年鉴' screen='Award' />
      <Heatmap right={80} bottom={40} id='年鉴.跳转' transparent />
    </>
  ))
}

export default Extra
