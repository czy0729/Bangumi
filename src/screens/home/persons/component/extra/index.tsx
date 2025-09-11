/*
 * @Author: czy0729
 * @Date: 2024-04-18 15:50:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 16:47:32
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  return useObserver(() => <Heatmap bottom={_.bottom} id='制作人员' screen='Persons' />)
}

export default Extra
