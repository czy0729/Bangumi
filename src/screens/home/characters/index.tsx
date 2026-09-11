/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 23:45:24
 *
 * 更多角色页: 条目角色分页列表
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useCharactersPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目更多角色 */
function Characters(props: NavigationProps) {
  const { id, $ } = useCharactersPage(props)

  return (
    <Component id='screen-characters'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.characters._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Characters)
