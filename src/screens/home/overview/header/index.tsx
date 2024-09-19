/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 21:34:28
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $ }: Ctx) {
  return <HeaderComp title={`${$.params.title} (${$.list.length})`} hm={['overview', 'Overview']} />
}

export default obc(Header, COMPONENT)
