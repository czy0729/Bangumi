/*
 * @Author: czy0729
 * @Date: 2024-04-06 03:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:14:42
 */
import React from 'react'
import { ob } from '@utils/decorators'
import HeaderComp from '@screens/discovery/anime/header'
import { COMPONENT, HM } from './ds'

function Header() {
  return <HeaderComp title='找游戏' alias='游戏' hm={HM} />
}

export default ob(Header, COMPONENT)
