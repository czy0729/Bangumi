/*
 * @Author: czy0729
 * @Date: 2024-03-22 05:15:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:02:11
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return <HeaderComp title='我回复的话题' hm={['group/my_reply', 'Replies']} />
}

export default obc(Header, COMPONENT)
