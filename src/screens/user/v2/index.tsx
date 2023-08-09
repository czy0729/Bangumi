/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:52:58
 */
import React from 'react'
import { Page, StatusBarEvents, Track } from '@components'
import { BlurViewRoot, BlurViewBottomTab, Login } from '@_'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { _, userStore } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Wrap from './wrap'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

const User = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|User`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  return useObserver(() => {
    // 自己并且没登录
    const { id } = $.usersInfo
    if (!id && !userStore.isLogin) return <Login style={_.container.plain} />

    const { _loaded } = $.state
    return (
      <>
        <StatusBarEvents barStyle='light-content' backgroundColor='transparent' />
        <Page>
          <BlurViewRoot>
            {!!_loaded && <Wrap />}
            <BlurViewBottomTab />
          </BlurViewRoot>
        </Page>
        <Track title='时光机' hm={[`user/${$.myUserId}?route=user`, 'User']} />
        <Heatmaps />
      </>
    )
  })
}

export default ic(Store, User)
