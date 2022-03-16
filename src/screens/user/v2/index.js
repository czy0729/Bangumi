/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 17:11:59
 */
import React from 'react'
import { StatusBarEvents, Track } from '@components'
import { Login } from '@_'
import { _, userStore } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Page from './page'
import Heatmaps from './heatmaps'
import Store from './store'

const User = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    // 自己并且没登录
    const { id } = $.usersInfo
    if (!id && !userStore.isLogin) return <Login style={_.container.plain} />

    return (
      <>
        <StatusBarEvents barStyle='light-content' backgroundColor='transparent' />
        <Page />
        <Track title='时光机' hm={[`user/${$.myUserId}?route=user`, 'User']} />
        <Heatmaps />
      </>
    )
  })
}

export default ic(Store, User)
