/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 14:54:50
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return <HeaderComp title='帖子聚合' alias='本地帖子' hm={['rakuen/history', 'RakuenHistory']} />
}

export default obc(Header, COMPONENT)
