/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:17:12
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useGamePage } from './hooks'

/** 找游戏 */
const Game = (props: NavigationProps) => {
  const { id, $ } = useGamePage(props)

  return useObserver(() => (
    <Component id='screen-game'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Game
