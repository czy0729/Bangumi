/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 日志页面: 列表 + 头部 + 调试面板
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
  const { id } = useBlogPage(props)

  return (
    <Component id='screen-blog'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(ScreenBlog)
