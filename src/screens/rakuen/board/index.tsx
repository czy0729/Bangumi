/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:31:19
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useBoardPage } from './hooks'

import type { NavigationProps } from '@types'

/** 讨论版 */
const Board = (props: NavigationProps) => {
  const { id, $ } = useBoardPage(props)

  return useObserver(() => (
    <Component id='screen-board'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.board._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Board
