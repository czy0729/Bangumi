/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 00:01:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import List from './component/list'
import Header from './header'
import { useTinygrailAdvanceAskPage } from './hooks'

import type { NavigationProps } from '@types'

/** 买入推荐 */
function TinygrailAdvanceAsk(props: NavigationProps) {
  const { id, $ } = useTinygrailAdvanceAskPage(props)

  return (
    <Component id='screen-tinygrail-advance-ask'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <TinygrailToolBar
            level={$.state.level}
            levelMap={$.levelMap}
            onLevelSelect={$.onLevelSelect}
          />
          <List />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailAdvanceAsk)
