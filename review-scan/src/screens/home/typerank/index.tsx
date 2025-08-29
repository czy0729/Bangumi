/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:35:32
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useTyperankPage } from './hooks'

/** 分类排行 */
const Typerank = (props: NavigationProps) => {
  const { id, $ } = useTyperankPage(props)

  return useObserver(() => (
    <Component id='screen-typerank'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.state.searching}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Typerank
