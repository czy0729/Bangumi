/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:09:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 09:06:56
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useTinygrailLotteryRankPage } from './hooks'

import type { NavigationProps } from '@types'

/** 刮刮乐日榜 */
const TinygrailLotteryRank = (props: NavigationProps) => {
  const { id } = useTinygrailLotteryRankPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-ico'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <ToolBar />
          <List />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailLotteryRank
