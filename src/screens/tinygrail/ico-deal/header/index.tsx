/*
 * @Author: czy0729
 * @Date: 2024-03-01 22:59:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 00:11:03
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='ICO'
      hm={[`tinygrail/ico/deal/${$.monoId}`, 'TinygrailICODeal']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
    />
  )
}

export default obc(Header, COMPONENT)
