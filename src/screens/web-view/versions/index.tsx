/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:45:12
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Web from './component/web'
import Header from './header'
import { useVersionsPage } from './hooks'

/** 更新内容 */
const Versions = (props: NavigationProps) => {
  const { id, $ } = useVersionsPage(props)

  return useObserver(() => (
    <Component id='screen-versions'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page>{!!$.state._loaded && <Web uri={$.state.uri} />}</Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Versions
