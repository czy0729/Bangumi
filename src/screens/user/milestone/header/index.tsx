/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 01:16:07
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Header() {
  return (
    <HeaderComp
      mode='float'
      statusBarEventsType='Subject'
      title='照片墙'
      hm={['milestone', 'Milestone']}
    />
  )
}

export default ob(Header, COMPONENT)
