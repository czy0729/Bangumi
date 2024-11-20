/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 18:34:20
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import Label from '../component/label'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
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

export default ob(Header, COMPONENT)
