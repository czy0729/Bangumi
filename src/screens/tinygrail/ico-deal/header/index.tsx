/*
 * @Author: czy0729
 * @Date: 2024-03-01 22:59:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 12:10:02
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title='ICO'
      hm={[`tinygrail/ico/deal/${$.monoId}`, 'TinygrailICODeal']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
    />
  )
}

export default ob(Header, COMPONENT)
