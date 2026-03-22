/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:59:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { BlurViewBottomTab, BlurViewRoot, Login } from '@_'
import { _, StoreContext, userStore } from '@stores'
import { ANDROID } from '@constants'
import Extra from './component/extra'
import { useUserPage } from './hooks'
import NestedScroll from './nested-scroll'
import Scroll from './scroll'

import type { NavigationProps, ReactNode } from '@types'

/** 时光机 */
function User(props: NavigationProps) {
  const { id, $ } = useUserPage(props)

  let el: ReactNode

  // 自己并且没登录
  if (!$.usersInfo.id && !userStore.isLogin) {
    el = <Login style={_.container.plain} />
  } else {
    const elScroll: ReactNode = !!$.state._loaded && (ANDROID ? <NestedScroll /> : <Scroll />)

    // 来自于别人的空间
    if ($.params.userId) {
      el = elScroll
    } else {
      // 来自时光机
      el = (
        <BlurViewRoot>
          {elScroll}
          <BlurViewBottomTab />
        </BlurViewRoot>
      )
    }
  }

  return (
    <Component id='screen-user'>
      <StoreContext.Provider value={id}>
        <Page>{el}</Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(User)
