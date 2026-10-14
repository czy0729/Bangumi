/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找游戏
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useGamePage } from './hooks'

import type { NavigationProps } from '@types'

/** 找游戏 */
function Game(props: NavigationProps) {
  const { id, $ } = useGamePage(props)

  return (
    <Component id='screen-game'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Game)
