/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:23:39
 */
import React from 'react'
import { Component, Header } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Page from './page'
import Check from './check'
import Store from './store'
import { Ctx } from './types'

const UserSetting = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-user-setting'>
      <Header
        title='个人设置'
        hm={['userSetting', 'UserSetting']}
        headerRight={() => <Check $={$} />}
      />
      <Page />
    </Component>
  ))
}

export default ic(Store, UserSetting)
