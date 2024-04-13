/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 16:53:41
 */
import React from 'react'
import { Component } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import Scroll from './scroll'
import Store from './store'
import { Ctx } from './types'

/** 个人设置 */
const UserSetting = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-user-setting'>
      <Header />
      <Scroll />
    </Component>
  ))
}

export default ic(Store, UserSetting)
