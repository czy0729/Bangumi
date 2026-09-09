/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 07:40:06
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Scroll from './component/scroll'
import Header from './header'
import { useUserTimelinePage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户的时间线 */
function UserTimeline(props: NavigationProps) {
  const { id } = useUserTimelinePage(props)

  return (
    <Component id='screen-user-timeline'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <Scroll />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(UserTimeline)
