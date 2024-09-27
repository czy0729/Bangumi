/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 16:48:10
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
      title='词云'
      hm={['wordCloud', 'WordCloud']}
    />
  )
}

export default ob(Header, COMPONENT)
