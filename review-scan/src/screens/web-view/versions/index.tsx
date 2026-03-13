/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:34:07
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
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
        <Page style={_.container.header}>{!!$.state._loaded && <Web uri={$.state.uri} />}</Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Versions
