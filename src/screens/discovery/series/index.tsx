/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:25:40
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import { useSeriesPage } from './hooks'

import type { NavigationProps } from '@types'

/** 关联系列 */
function Series(props: NavigationProps) {
  const { id, $ } = useSeriesPage(props)

  return (
    <Component id='screen-series'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
          <Tips />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Series)
