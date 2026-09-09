/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:35:49
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useUserBlogsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户日志 */
function UserBlogs(props: NavigationProps) {
  const { id } = useUserBlogsPage(props)

  return (
    <Component id='screen-user-blogs'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
        <Heatmap bottom={_.bottom} id='用户日志' screen='Blogs' />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(UserBlogs)
