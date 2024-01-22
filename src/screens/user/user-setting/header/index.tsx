/*
 * @Author: czy0729
 * @Date: 2024-01-21 07:52:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-21 07:53:44
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import Check from '../component/check'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='个人设置'
      hm={['userSetting', 'UserSetting']}
      headerRight={() => <Check $={$} />}
    />
  )
}

export default obc(Header, COMPONENT)
