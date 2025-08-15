/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:50:47
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import { useSeriesPage } from './hooks'

/** 关联系列 */
const Series = (props: NavigationProps) => {
  const { id, $ } = useSeriesPage(props)

  return useObserver(() => (
    <Component id='screen-series'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List />
          <Tips />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Series
