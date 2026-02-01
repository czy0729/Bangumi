/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 10:23:36
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Chart from './component/chart'
import List from './component/list'
import Header from './header'
import { useSponsorPage } from './hooks'

import type { NavigationProps } from '@types'

/** 赞助者 */
const Sponsor = (props: NavigationProps) => {
  const { id, $ } = useSponsorPage(props)

  return useObserver(() => (
    <Component id='screen-sponsor'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          {$.state.list ? <List /> : <Chart />}
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Sponsor
