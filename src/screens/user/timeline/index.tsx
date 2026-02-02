/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 07:40:06
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Scroll from './component/scroll'
import Header from './header'
import { useUserTimelinePage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户的时间线 */
const UserTimeline = (props: NavigationProps) => {
  const { id } = useUserTimelinePage(props)

  return useObserver(() => (
    <Component id='screen-user-timeline'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <Scroll />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default UserTimeline
