/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:33:12
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useBoardPage } from './hooks'

/** 讨论版 */
const Board = (props: NavigationProps) => {
  const { id, $ } = useBoardPage(props)

  return useObserver(() => (
    <Component id='screen-board'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.board._loaded}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Board
