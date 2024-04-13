/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 16:51:13
 */
import React from 'react'
import { Component, Page } from '@components'
import { BlurViewBottomTab, BlurViewRoot, Login } from '@_'
import { _, userStore } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS, STORYBOOK } from '@constants'
import Extra from './component/extra'
import { useUserPage } from './hooks'
import NestedScroll from './nested-scroll'
import Scroll from './scroll'
import Store from './store'
import { Ctx } from './types'

/** 时光机 */
const User = (props, context: Ctx) => {
  useUserPage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-user'>
      <Page>
        {/* 自己并且没登录 */}
        {!$.usersInfo.id && !userStore.isLogin ? (
          <Login style={_.container.plain} />
        ) : (
          <BlurViewRoot>
            {!!$.state._loaded && (!IOS && !STORYBOOK ? <NestedScroll /> : <Scroll />)}
            <BlurViewBottomTab />
          </BlurViewRoot>
        )}
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, User)
