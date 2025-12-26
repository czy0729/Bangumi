/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 18:33:29
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useTinygrailStarPage } from './hooks'

import type { NavigationProps } from '@types'

/** 通天塔 */
const TinygrailStar = (props: NavigationProps) => {
  const { id } = useTinygrailStarPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-star'>
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

export default TinygrailStar
