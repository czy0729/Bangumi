/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:58:43
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailRichPage } from './hooks'

/** 番市首富 */
const TinygrailRich = (props: NavigationProps) => {
  const { id, $ } = useTinygrailRichPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-rich'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page style={_.container.tinygrail} loaded={$.state._loaded}>
          <Tabs />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailRich
