/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 06:50:48
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import Extra from '../component/extra'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $ }: Ctx) {
  return <HeaderComp title='小组' hm={['group/mine', 'Mine']} headerRight={() => <Extra $={$} />} />
}

export default obc(Header, COMPONENT)
