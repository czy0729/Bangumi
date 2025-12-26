/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:17:48
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useGamePage } from './hooks'

import type { NavigationProps } from '@types'

/** 找游戏 */
const Game = (props: NavigationProps) => {
  const { id, $ } = useGamePage(props)

  return useObserver(() => (
    <Component id='screen-game'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Game
