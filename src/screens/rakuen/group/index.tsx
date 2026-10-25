/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 *
 * 小组页面: 小组信息 + 帖子列表 + 分页
 */
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import List from './component/list'
import Pagination from './component/pagination'
import Header from './header'
import { useGroupPage } from './hooks'

import type { NavigationProps } from '@types'

/** 小组 */
function Group(props: NavigationProps) {
  const { id } = useGroupPage(props)

  return (
    <Component id='screen-rakuen-group'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List />
          <Pagination />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Group)
