/*
 * @Author: czy0729
 * @Date: 2024-04-03 22:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-03 22:03:04
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { COMPONENT } from './ds'

function Header() {
  return <HeaderComp title='Bangumi年鉴' hm={['discovery/yearbook', 'Yearbook']} />
}

export default obc(Header, COMPONENT)
