/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:29:16
 */
import React from 'react'
import { Component, HeaderPlaceholder } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Header from './header'
import { useUserSettingPage } from './hooks'
import Scroll from './scroll'

import type { NavigationProps } from '@types'

/** 个人设置 */
const UserSetting = (props: NavigationProps) => {
  const { id, handleForwardRef, handleOnScroll, handleScrollIntoViewIfNeeded, handleRefresh } =
    useUserSettingPage(props)

  return useObserver(() => (
    <Component id='screen-user-setting'>
      <StoreContext.Provider value={id}>
        <HeaderPlaceholder />
        <Scroll
          forwardRef={handleForwardRef}
          onScroll={handleOnScroll}
          onScrollIntoViewIfNeeded={handleScrollIntoViewIfNeeded}
          onRefresh={handleRefresh}
        />
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default UserSetting
