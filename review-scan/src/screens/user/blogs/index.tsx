/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:35:35
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useUserBlogsPage } from './hooks'

/** 用户日志 */
const UserBlogs = (props: NavigationProps) => {
  const { id } = useUserBlogsPage(props)

  return useObserver(() => (
    <Component id='screen-user-blogs'>
      <StoreContext.Provider value={id}>
        <Page>
          <List />
        </Page>
        <Header />
        <Heatmap bottom={_.bottom} id='用户日志' screen='Blogs' />
      </StoreContext.Provider>
    </Component>
  ))
}

export default UserBlogs
