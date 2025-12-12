/*
 * @Author: czy0729
 * @Date: 2024-04-17 21:36:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 21:37:25
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  return useObserver(() => <Heatmap bottom={_.bottom} id='条目目录' screen='SubjectCatalogs' />)
}

export default Extra
