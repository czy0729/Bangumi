/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-28 19:37:04
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $ }: Ctx) {
  return (
    <HeaderComp
      mode='float'
      statusBarEventsType='Subject'
      title={$.title ? `${$.title}的词云` : '词云'}
      hm={['wordCloud', 'WordCloud']}
    />
  )
}

export default obc(Header, COMPONENT)
