/*
 * @Author: czy0729
 * @Date: 2024-04-03 22:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:20:48
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Header() {
  return <HeaderComp title='Bangumi年鉴' hm={['discovery/yearbook', 'Yearbook']} />
}

export default ob(Header, COMPONENT)
