/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * 个人设置 (头像 / 背景 / 昵称 / 签名)
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder } from '@components'
import { StoreContext } from '@stores'
import Header from './header'
import { useUserSettingPage } from './hooks'
import Scroll from './component/scroll'

import type { NavigationProps } from '@types'

/** 个人设置 */
function UserSetting(props: NavigationProps) {
  const { id, handleForwardRef, handleOnScroll, handleScrollIntoViewIfNeeded, handleRefresh } =
    useUserSettingPage(props)

  return (
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
  )
}

export default observer(UserSetting)
