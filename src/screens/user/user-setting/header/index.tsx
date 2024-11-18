/*
 * @Author: czy0729
 * @Date: 2024-01-21 07:52:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:49:19
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import Check from '../component/check'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title='个人设置'
      hm={['userSetting', 'UserSetting']}
      headerRight={() => <Check $={$} />}
    />
  )
}

export default ob(Header, COMPONENT)
