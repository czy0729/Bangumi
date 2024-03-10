/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:13:50
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import Label from '../component/label'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='通天塔(β)'
      hm={['tinygrail/star', 'Star']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
      headerRight={() => <Label $={$} />}
    />
  )
}

export default obc(Header, COMPONENT)
