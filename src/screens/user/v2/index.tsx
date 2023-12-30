/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 22:39:02
 */
import React from 'react'
import { Page, Track, Component } from '@components'
import { BlurViewRoot, BlurViewBottomTab, Login } from '@_'
import { _, userStore } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS, STORYBOOK } from '@constants'
import Wrap from './wrap'
import NestedScroll from './nested-scroll'
import Heatmaps from './heatmaps'
import Store from './store'
import { useUserPage } from './hooks'
import { Ctx } from './types'

/** 我的时光机 */
const User = (props, { $, navigation }: Ctx) => {
  useUserPage($, navigation)

  return useObserver(() => {
    // 自己并且没登录
    const { id } = $.usersInfo
    if (!id && !userStore.isLogin) {
      return (
        <Page>
          <Login style={_.container.plain} />
        </Page>
      )
    }

    const { _loaded } = $.state
    return (
      <Component id='screen-user'>
        <Page>
          <BlurViewRoot>
            {!!_loaded && (!IOS && !STORYBOOK ? <NestedScroll /> : <Wrap />)}
            <BlurViewBottomTab />
          </BlurViewRoot>
        </Page>
        <Track title='时光机' hm={[`user/${$.myUserId}?route=user`, 'User']} />
        <Heatmaps />
      </Component>
    )
  })
}

export default ic(Store, User)
