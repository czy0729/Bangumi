/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:05:57
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Textarea from './component/textarea'
import Header from './header'
import { useDollarsPage } from './hooks'

import type { NavigationProps } from '@types'

/** Dollars */
const Dollars = (props: NavigationProps) => {
  const { id, $ } = useDollarsPage(props)

  return useObserver(() => (
    <Component id='screen-dollars'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.dollars._loaded}>
          <HeaderPlaceholder />
          <Textarea />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Dollars
