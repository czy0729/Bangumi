/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:56:47
 */
import React from 'react'
import { Component, Page } from '@components'
import { BlurViewBottomTab, BlurViewRoot, Login } from '@_'
import { _, StoreContext, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ANDROID } from '@constants'
import { NavigationProps, ReactNode } from '@types'
import Extra from './component/extra'
import { useUserPage } from './hooks'
import NestedScroll from './nested-scroll'
import Scroll from './scroll'

/** 时光机 */
const User = (props: NavigationProps) => {
  const { id, $ } = useUserPage(props)

  return useObserver(() => {
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
  })
}

export default User
