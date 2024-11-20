/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 11:40:43
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailICOPage } from './hooks'

/** ICO 榜单 */
const TinygrailICO = (props: NavigationProps) => {
  const { id, $ } = useTinygrailICOPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-ico'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page style={_.container.tinygrail} loaded={$.state._loaded}>
          <Tabs />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailICO
