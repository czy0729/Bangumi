/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:27:51
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useBlogPage } from './hooks'

/** 日志 */
const Blog = (props: NavigationProps) => {
  const { id, $, fixed, handleScroll } = useBlogPage(props)

  return useObserver(() => (
    <Component id='screen-blog'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List $={$} onScroll={handleScroll} />
        </Page>
        <Header fixed={fixed} />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Blog
