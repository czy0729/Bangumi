/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:36:07
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import ListAll from './component/list-all'
import Header from './header'
import { useMinePage } from './hooks'

import type { NavigationProps } from '@types'

/** 小组 */
const Mine = (props: NavigationProps) => {
  const { id, $ } = useMinePage(props)

  return useObserver(() => (
    <Component id='screen-mine'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          {$.state.type === 'mine' ? <List /> : <ListAll />}
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Mine
