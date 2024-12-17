/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:42:25
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
        <Page style={[_.container.tinygrail, _.container.header]} loaded={$.state._loaded}>
          <Tabs />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailICO
