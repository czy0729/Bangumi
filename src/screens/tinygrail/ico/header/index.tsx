/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:23:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 09:12:36
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Header() {
  return (
    <HeaderComp
      title='ICO 榜单'
      hm={['tinygrail/ico', 'TinygrailICO']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
    />
  )
}

export default ob(Header, COMPONENT)
