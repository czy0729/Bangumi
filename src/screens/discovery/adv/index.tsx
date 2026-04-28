/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:12:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { Header } from '../anime'
import List from './component/list'
import { useADVPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找 Gal */
function ADV(props: NavigationProps) {
  const { id, $ } = useADVPage(props)

  return (
    <Component id='screen-adv'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header title='找 Gal' alias='ADV' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(ADV)
