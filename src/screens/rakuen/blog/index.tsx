/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 21:34:58
 */
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useBlogPage } from './hooks'

import type { NavigationProps } from '@types'

/** 日志 */
function ScreenBlog(props: NavigationProps) {
  const { id, $, fixed, handleScroll } = useBlogPage(props)

  return (
    <Component id='screen-blog'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List $={$} onScroll={handleScroll} />
        </Page>
        <Header fixed={fixed} />
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(ScreenBlog)
